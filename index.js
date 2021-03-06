'use strict'
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.globalpeace.com.br',
    port: 587,
    secure: false,
    auth: {
        user: 'cadastro@globalpeace.com.br',
        pass: 'cadastro2017'
    }
});

const express = require('express');
const app = express();
const port = (process.env.PORT || 5000);
const factory = require('./domainFactory');

const nodeCache = require('node-cache');
const cache = new nodeCache();

app.use(express.static('public/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

app.post('/api/v1/recover/', (req, resp) => {
    let body = req.body;
    factory.buildUserService()
        .findByEmail(body.email)
        .then((user) => {
            if (user && user.cpf == body.cpf) {
                const mailOptions = {
                    from: 'cadastro@globalpeace.com.br',
                    to: body.email,
                    subject: 'Recuperação de Senhas Venda Mais',
                    text: `Sua senha de acesso é:${user.password}`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    resp.redirect("/sent.html");
                });
            }
        })
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode(422);
            res.send(err);
            resp.end();
        });
});

//==== file upload
app.post('/api/v1/fileUpload/', (req, resp) => {
    let id = req.body.adId;

    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let adFile = req.files.adFile;
    const callback = () => {
        resp.redirect('/#/profile/images');
        resp.end();
    }
    factory.buildMediaRepository().salveMediaFor(id, adFile.data, callback);
});

app.get('/api/v1/media/ad/:id', (req, resp) => {
    const id = req.params.id;

    const callback = function (list) {
        resp.json(list);
        resp.end();
    }
    factory.buildMediaRepository().retrieveMediaFor(id, callback);
});

app.get('/api/v1/media/:id/:name', (req, resp) => {
    const id = req.params.id;
    const name = req.params.name;

    var media = factory.buildMediaRepository().getMedia(id, name);
    resp.writeHead(200, { 'Content-Type': 'image/jpg' })
    resp.end(media, 'binary');
});

app.get('/api/v1/media/remove/:id/:name', (req, resp) => {
    const id = req.params.id;
    const name = req.params.name;

    var media = factory.buildMediaRepository().removeMedia(id, name);
    resp.redirect('/#/profile/images');
    resp.end();
});

//==== rating
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

app.get('/api/v1/rating/count/:id', (req, resp) => {
    const id = req.params.id;
    factory.buildRatingService()
        .countByAdId(id)
        .then((r) => {
            resp.send(r);
            resp.end();
        })
        .catch(() => {
            resp.send(data);
            resp.end();
        });
});

app.get('/api/v1/rating/:id', (req, resp) => {
    const id = req.params.id;
    factory.buildRatingService()
        .findByAdId(id)
        .then((data) => {
            if (data)
                resp.send(data);
            else
                resp.statusCode = 404;
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.put('/api/v1/rating/aprove/:id', (req, resp) => {
    const id = req.params.id;
    factory.buildRatingService()
        .aprove(id)
        .then(() => {
            resp.statusCode = 200;
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.get('/api/v1/aprove/', (req, resp) => {
    factory.buildRatingService()
        .getToAprove()
        .then((data) => {
            resp.statusCode = 200;
            resp.send(data);
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.put('/api/v1/rating/desaprove/:id', (req, resp) => {
    let id = req.params.id;
    if (id.length === 10)
        id = `0${id}`;

    factory.buildRatingService()
        .desaprove(id)
        .then(() => {
            resp.statusCode = 200;
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.put('/api/v1/ad/desaprove/:id/:reason', (req, resp) => {
    let id = req.params.id;
    let reason = req.params.reason || 'Está em desacordo com os termos de serviço';
    if (id.length === 10)
        id = `0${id}`;
    factory.buildAdService()
        .desaprove(id)
        .then(() => {
            factory.buildUserService().getByCpf(id)
            .then((data) => {
                const mailOptions = {
                    from: 'cadastro@globalpeace.com.br',
                    to: data.email,
                    subject: 'Seu anuncio foi recusado.',
                    text: `Seu anúncion não foi aprovado. Providencie os ajustes ou entre em contato. Motivo: "${reason}"`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    resp.statusCode = 200;
                    resp.end();
                });
            })
            .catch((err) => {
                resp.send(err);
                resp.end();
            });
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});


//==== auth
app.post('/api/v1/user/', (req, resp) => {
    let newUser = req.body;
    factory.buildUserService()
        .insert(newUser)
        .then(() => {
            factory.buildAdService()
                .insert({
                    id: newUser.cpf,
                    name: newUser.name,
                    email: newUser.email,
                    description: '',
                    region: '',
                    category: '',
                    phone: '',
                    site: ''
                });
            resp.end();
        })
        .catch((err) => {
            resp.statusCode = 422;
            resp.send(err);
            resp.end();
        });
});

app.post('/api/v1/auth/', (req, resp) => {
    let auth = req.body;
    factory.buildUserService()
        .auth(auth.email, auth.password)
        .then((data) => {
            if (!cache.get(data.token))
                cache.set(data.token, data.cpf, 3600);

            resp.send(data);
            resp.end();
        })
        .catch((err) => {
            if (err == "invalid")
                resp.statusCode = 401;
            else
                resp.statusCode = 422;
            resp.send(err);
            resp.end();
        });
});

app.get('/api/v1/user/:id', (req, resp) => {
    const id = req.params.id;
    factory.buildUserService()
        .getByEmail(id)
        .then((data) => {
            resp.send(data);
            resp.end();
        })
        .catch((err) => {
            if (err == "invalid")
                resp.statusCode = 401;
            else
                resp.statusCode = 422;
            resp.send(err);
            resp.end();
        });
});

//==== ad
app.post('/api/v1/ad/', (req, resp) => {
    let newAd = req.body;
    factory.buildAdService()
        .insert(newAd)
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode = 422;
            resp.send(err);
        });
});

app.get('/api/v1/category/', (req, resp) => {
    factory.buildAdService()
        .getCategories()
        .then((data) => {
            resp.json(data);
            resp.end();
        })
        .catch((err) => {
            resp.statusCode = 422;
            resp.send(err);
        });
});

app.put('/api/v1/ad/:id', (req, resp) => {
    const id = req.params.id;
    let adToUpdate = req.body;
    factory.buildAdService()
        .update(adToUpdate)
        .then(() => {
            resp.end();
        })
        .catch((err) => {
            resp.statusCode = 422;
            resp.send(err);
        });
});

app.post('/api/v1/profile/update/', (req, resp) => {
    let body = req.body;
    let adToUpdate = {};
    const id = body.id;
    adToUpdate.id = id;
    adToUpdate.name = body.name;
    adToUpdate.region = body.region;
    adToUpdate.phone = body.phone;
    adToUpdate.email = body.email;
    adToUpdate.site = body.site;
    factory.buildAdService()
        .updateProfile(adToUpdate)
        .then(() => {
            resp.redirect('/#/profile/account');
            resp.end();
        })
        .catch((err) => {
            resp.statusCode = 422;
            resp.send(err);
        });
});

app.get('/api/v1/ad/:id', (req, resp) => {
    const id = req.params.id;
    factory.buildAdService().findById(id)
        .then((data) => {
            if (data) {

                factory.buildRatingService()
                    .countByAdId(id)
                    .then((r) => {
                        data.rating = r;
                        resp.send(data);
                        resp.end();
                    })
                    .catch(() => {
                        resp.send(data);
                        resp.end();
                    });
            }
            else {
                resp.statusCode = 404;
                resp.end();
            }
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
                resp.statusCode = 404;
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

app.delete('/api/v1/ad/:id/:reason', (req, resp) => {
    const id = req.params.id;
    let reason = req.params.reason || 'Está em desacordo com os termos de serviço';
    factory.buildUserService().getByCpf(id)
    .then((data) => {
        const mailOptions = {
            from: 'cadastro@globalpeace.com.br',
            to: data.email,
            subject: 'Seu anuncio foi recusado.',
            text: `Seu anúncion não foi aprovado. Providencie os ajustes ou entre em contato. Motivo: "${reason}"`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            resp.statusCode = 200;
            resp.end();
        });
        factory.buildAdService().delete({ 'id': id });
    })
    .catch((err) => {
        resp.send(err);
        resp.end();
    });
});

app.put('/api/v1/ad/aprove/:id', (req, resp) => {
    let id = req.params.id;
    if (id.length === 10)
        id = `0${id}`;
    factory.buildAdService()
        .aprove(id)
        .then(() => {
            resp.statusCode = 200;
            resp.end();
        })
        .catch((err) => {
            resp.send(err);
            resp.end();
        });
});

//==== search
app.get('/search/:q', (req, resp) => {
    const exp = req.params.q;
    factory.buildAdService().search(exp).then((data) => {
        if (data)
            resp.send(data);
        else
            resp.statusCode = 404;
        resp.end();
    }).catch((err) => {
        resp.send(err);
        resp.end();
    });
});

module.exports = app.listen(port, () => {
    const db = require('sqlite');
    const dbName = './adFinder.sqlite';

    db.open(dbName).then(() => {
        db.migrate().then(() => {
            console.log(`listening at ${port}`);
        }
        ).catch((err) => { throw err });
    }).catch((err) => { throw err });

});
