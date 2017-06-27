const ArRepository = require('./AdRepository').AdRepository;
const express = require('express');
const app = express();
const port = 443;

app.use(express.static('public'));

app.post('/ad/', (req, resp) => {
    let newAd = {
        name: req.body.name,
        id: 0,
        description: req.body.description,
        region: req.body.region,
        category: req.body.category,
        contacts: {
            phone: req.body.phone,
            email: req.body.email,
            site: req.body.site,
        },
        medias: {
            photos: [
                'https://s-media-cache-ak0.pinimg.com/736x/e5/a0/69/e5a06942fa42823c88be5f3a834e063d--fantastic-art-bat-family.jpg',
                'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/dc/mugshots/mugshot%202016/76061_1to1_mf_batman_336.png?l.r2=-798905063',
            ]
        },
    }

    const repository = new AdRepository();
    repository.save(newAd);
    resp.end();
});

app.put('/ad/', (req, resp) => {
    let adToUpdate = {
        name: req.body.name,
        id: req.body.id,
        description: req.body.description,
        region: req.body.region,
        category: req.body.category,
        contacts: {
            phone: req.body.phone,
            email: req.body.email,
            site: req.body.site,
        },
        medias: {
            photos: [
                'https://s-media-cache-ak0.pinimg.com/736x/e5/a0/69/e5a06942fa42823c88be5f3a834e063d--fantastic-art-bat-family.jpg',
                'https://lc-www-live-s.legocdn.com/r/www/r/catalogs/-/media/catalogs/characters/dc/mugshots/mugshot%202016/76061_1to1_mf_batman_336.png?l.r2=-798905063',
            ]
        },
    }

    const repository = new AdRepository();
    repository.save(adToUpdate);
    resp.end();
});

app.get('/ad/:id', (req, resp) => {
    const repository = new AdRepository();
    const id = parseInt(req.param("id",0));
    let found = repository.findById(id);
    resp.write(found);
    resp.end();
});

app.delete('/ad/:id', (req, resp) => {
    const repository = new AdRepository();
    const id = parseInt(req.param("id",0));
    repository.delete(id);
    resp.end();
});

app.get('/ad/search', (req, resp) => {
    resp.write('not implemented');
    resp.end();
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
