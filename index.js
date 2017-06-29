'use strict'
const AdRepository = require('./AdRepository').AdRepository;
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const port = (process.env.PORT || 5000);
const repository = new AdRepository();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/v1/ad/', (req, resp) => {
    let newAd = req.body;
    newAd.id = 0;
    repository.save(newAd);
    resp.end();
});

app.put('/api/v1/ad/', (req, resp) => {
    let adToUpdate = req.body;
    repository.save(adToUpdate);
    resp.end();
});

app.get('/api/v1/ad/:id', (req, resp) => {    
    const id = parseInt(req.params.id);
    let found = repository.findById(id);
    if(found)
        resp.json(found);
    else
        resp.status(404).send();
    resp.end();
});

app.delete('/api/v1/ad/:id', (req, resp) => {
    const id = parseInt(req.params.id);
    repository.delete({'id': id});
    resp.end();
});

app.get('/api/v1/ad/search', (req, resp) => {
    resp.status(501).send('not implemented');
    resp.end();
});

module.exports = app.listen(port, () => {
    console.log(`listening at ${port}`);
});
