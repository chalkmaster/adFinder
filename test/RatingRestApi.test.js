process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../index.js');

const model = require('./mock/rating.mock');

chai.use(chaiHTTP);

describe('Rating Rest Tests', () => {
  describe('api v1', () => {

    it('/GET should return empty', () => {
      chai.request(server)
        .get('/api/v1/rating/1')
        .end((err, res) => {
          if (err) throw err;

          chai.expect(res.status).to.be.eq(200);

          done();
        });
    });

    it('/POST should persist', () => {
      chai.request(server)
        .post('/api/v1/rating/')
        .send(model)
        .end((err, res) => {
          res.should.have.status(200);
          chai.request(server)
            .get('/api/rating/ad/61947427121')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('id').eql(61947427121);
              res.body.id.should.be.eq(61947427121);
              done();
            });
        });
    });

  });
});