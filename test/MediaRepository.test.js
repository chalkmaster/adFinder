
process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const fs = require('fs');
const factory = require('../domainFactory');

describe('Media Repository Tests', () => {
  describe('images', () => {
    after((done) => {
      for(let file of fs.readdirSync('./mediaStore/9999')){
        fs.unlinkSync('./mediaStore/9999/' + file);
      }
      fs.rmdirSync('./mediaStore/9999');      
      done();
    });

    it('can save image', (done) => {
      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync('./test/img.png');

      if (!image)
        throw 'error';
        
      repository.salveMediaFor('9999', image);
      
      let dirData = fs.readdirSync('./mediaStore/9999');

      expect(dirData.length).to.be.gt(0);
      done();
    });

    it('can read image', (done) => {
      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync('./test/img.png');

      if (!image)
        throw 'error';
        
      repository.salveMediaFor('9999', image);
      
      let dirData = fs.readdirSync('./mediaStore/9999');

      expect(dirData.length).to.be.gt(0);

      let data = repository.getMedia('9999', dirData[0]);
      expect(data.length).to.be.gt(0);
      done();
    });

    it('can retrieve all', (done) => {

      let repository = factory.buildMediaRepository();
      let image = fs.readFileSync('./test/img.png');

      if (!image)
        throw 'error';
        
      repository.salveMediaFor('9999', image);
      
      let dirData = repository.retrieveMediaFor('9999');

      expect(dirData.length).to.be.gt(0);

      done();

    });

  });
});