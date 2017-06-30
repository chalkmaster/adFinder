process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const factory = require('../domainFactory');

const validAd = { id: 1, name: 'charles' };

describe("ad service tests", () => {
  describe("CRUD Operations", () => {
    it("can add new", () => {
      const service = factory.buildAdService();
      const initialRepositoryLenth = service.retrieveTabeSize();
      console.log(initialRepositoryLenth);
      service.save(validAd);
      console.log(service.retrieveTabeSize());
      expect(service.retrieveTabeSize()).gt(initialRepositoryLenth);
    });

    it("can find by Id", () => {
      const service = factory.buildAdService();
      const initialRepositoryLenth = service.retrieveTabeSize();
      service.save(validAd);

      let found = service.findById(validAd.id);

      expect(found.name).to.eq(validAd.name);
    });

    it("can delete", () => {
      const service = factory.buildAdService();
      const initialRepositoryLenth = service.retrieveTabeSize();
      service.save(validAd);

      let found = service.findById(validAd.id);

      expect(found.name).to.eq(validAd.name);

      service.delete(found);

      found = service.findById(validAd.id);
      expect(found).to.be.null;
    });

    it("can update", () => {
      const service = factory.buildAdService();
      const initialRepositoryLenth = service.retrieveTabeSize();
      service.save(validAd);

      let found = service.findById(validAd.id);

      expect(found).not.be.null;
      expect(found.name).to.eq(validAd.name);
      const newName = 'renan'
      found.name = newName;
      service.save(found);

      found = service.findById(validAd.id);

      expect(found).not.be.null;
      expect(found.name).to.eq(newName);
    });
  });
});