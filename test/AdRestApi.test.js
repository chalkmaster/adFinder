process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../index.js');
const AdRepository = require('../AdRepository.js').AdRepository;

const validAd = { id: 1, name: 'charles' };

chai.use(chaiHTTP);

describe('Ad Rest Tests', () => {
  describe('api v1', () => {
    it('/GET should return empty', () => {
      chai.request(server)
        .get('/api/v1/ad/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.null;
          done();
        });
    });

    it('/POST should persist', () => {
      chai.request(server)
        .post('/api/v1/ad/')
        .send(validAd)
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(server)
            .get('/api/v1/ad/1')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('id').eql(1);
              res.body.id.should.be.eq(1);
              done();
            });
        });
    });

    it('/PUT should persist', () => {

      chai.request(server)
        .post('/api/v1/ad/')
        .send(validAd)
        .end((err, res) => {

          res.should.have.status(200);
          //---
          chai.request(server)
            .get('/api/v1/ad/1')
            .end((err, res) => {

              res.should.have.status(200);
              res.body.should.have.property('id').eql(1);

              let update = { id: 1, name: 'renan' }
              //---
              chai.request(server)
                .put('/api/v1/ad/')
                .send(update)
                .end((err, res) => {

                  res.should.have.status(200);
                  //---
                  chai.request(server)
                    .get('/api/v1/ad/1')
                    .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.have.property('name').eql('renan');
                      done();
                    });
                });
            });
        });
    });

    it('/DELETE should persist', () => {

      chai.request(server)
        .post('/api/v1/ad/')
        .send(validAd)
        .end((err, res) => {

          res.should.have.status(200);
          //---
          chai.request(server)
            .get('/api/v1/ad/1')
            .end((err, res) => {

              res.should.have.status(200);
              res.body.should.have.property('id').eql(1);

              //---
              chai.request(server)
                .delete('/api/v1/ad/1')
                .end((err, res) => {

                  res.should.have.status(200);
                  //---
                  chai.request(server)
                    .get('/api/v1/ad/1')
                    .end((err, res) => {
                      res.should.have.status(200);
                      done();
                    });
                });
            });
        });
    });


  });
});