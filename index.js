'use strict'
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = (process.env.PORT || 5000);
const factory = require('./domainFactory');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/v1/ad/', (req, resp) => {
    let newAd = req.body;
    newAd.id = 0;
    factory.buildAdService().save(newAd);
    resp.end();
});

app.put('/api/v1/ad/', (req, resp) => {
    let adToUpdate = req.body;
    factory.buildAdService().save(adToUpdate);
    resp.end();
});

app.get('/api/v1/ad/:id', (req, resp) => {    
    const id = parseInt(req.params.id);
    let found = factory.buildAdService().findById(id);
    if(found)
        resp.json(found);
    else
        resp.status(404).send();
    resp.end();
});

app.delete('/api/v1/ad/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    factory.buildAdService().delete({'id': id});
    resp.end();
});

app.get('/api/v1/ad/search', (req, resp) => {
    const id = parseInt(req.params.q);    
    let found = factory.buildAdService().search(q);
    if(found)
        resp.json(found);
    else
        resp.status(404).send();
    resp.end();
});

module.exports = app.listen(port, () => {
    console.log(`listening at ${port}`);
});
