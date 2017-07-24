'use strict'
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = (process.env.PORT || 5000);
const factory = require('./domainFactory');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/v1/rating/', (req, resp) => {
    let newRate = req.body;
    factory.buildRatingService()
        .insert(newRate)
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode(422);
            res.send(err);
            resp.end();            
        });
});

app.get('/api/v1/rating/:id', (req, resp) => {
    const id = parseInt(req.params.id);    
    factory.buildRatingService()
        .findByAdId(id)
        .then((data) => {
            if (data)
                resp.send(data);
            else
                resp.statusCode(404);
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.post('/api/v1/ad/', (req, resp) => {
    let newAd = req.body;
    factory.buildAdService()
        .insert(newAd)
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode(422);
            res.send(err);
        });
});

app.put('/api/v1/ad/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    let adToUpdate = req.body;
    factory.buildAdService()
        .update(adToUpdate)
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode(422);
            res.send(err);
        });
});

app.get('/api/v1/ad/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    factory.buildAdService().findById(id)
        .then((data) => {
            if (data)
                resp.send(data);
            else
                resp.statusCode(404);
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.get('/api/v1/ad/', (req, resp) => {
    factory.buildAdService().findAll()
        .then((data) => {
            if (data)
                resp.send(data);
            else
                resp.statusCode(404);
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.delete('/api/v1/ad/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    factory.buildAdService().delete({ 'id': id }).then(() => {
        resp.end();
    });
});

app.get('/search/:q', (req, resp) => {
    const exp = req.params.q;
    factory.buildAdService().search(exp).then((data) => {
        if (data)
            resp.send(data);
        else
            resp.statusCode(404);
        resp.end();
    }).catch((err) => {
        resp.send(err);
        resp.end();
    });
});

module.exports = app.listen(port, () => {
    console.log(`listening at ${port}`);
});