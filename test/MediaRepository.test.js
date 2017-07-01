
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const fs = require('fs');
const factory = require('../domainFactory');
const mediaTestId = '9999';
const mediaPath = `./mediaStore/${mediaTestId}`;
const imageMock = './test/mock/img.mock.png';

describe('Media Repository Tests', () => {
  describe('images', () => {
    after((done) => {
      for(let file of fs.readdirSync(mediaPath)){
        fs.unlinkSync(`${mediaPath}/${file}`);
      }
      fs.rmdirSync(mediaPath);      
      done();
    });

    it('can save image', (done) => {
      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync(imageMock);

      if (!image)
        throw 'error';
        
      repository.salveMediaFor(mediaTestId, image);
      
      let dirData = fs.readdirSync(mediaPath);

      expect(dirData.length).to.be.gt(0);
      done();
    });

    it('can read image', (done) => {
      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync(imageMock);

      if (!image)
        throw 'error';
        
      repository.salveMediaFor(mediaTestId, image);
      
      let dirData = fs.readdirSync(mediaPath);

      expect(dirData.length).to.be.gt(0);

      let data = repository.getMedia(mediaTestId, dirData[0]);
      expect(data.length).to.be.gt(0);
      done();
    });

    it('can retrieve all', (done) => {

      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync(imageMock);

      if (!image)
        throw 'error';
        
      repository.salveMediaFor(mediaTestId, image);
      
      let dirData = repository.retrieveMediaFor(mediaTestId);

      expect(dirData.length).to.be.gt(0);

      done();

    });

  });
});