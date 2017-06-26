const express = require('express');
const app = express();
const port = 8081;

app.use(express.static('public'));

app.post('/ad/', (req, resp) => {

});

app.put('/ad/', (req, resp) => {

});

app.get('/ad/:id', (req, resp) => {

});

app.delete('/ad/:id', (req, resp) => {

});

app.get('/ad/search', (req, resp) => {

});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});