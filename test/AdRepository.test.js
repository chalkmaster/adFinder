process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const AdRepository = require('../AdRepository.js').AdRepository;

const validAd = { id: 1, name: 'charles' };

describe("ad repository testes", () => {
  describe("CRUD Operations", () => {
    it("can add new", () => {
      const repository = new AdRepository();
      const initialRepositoryLenth = repository.dataStore.length;
      repository.save(validAd);
      expect(repository.dataStore.length).gt(initialRepositoryLenth);
    });

    it("can find by Id", () => {
      const repository = new AdRepository();
      const initialRepositoryLenth = repository.length;
      repository.save(validAd);

      let found = repository.findById(validAd.id);

      expect(found.name).to.eq(validAd.name);
    });

    it("can delete", () => {
      const repository = new AdRepository();
      const initialRepositoryLenth = repository.length;
      repository.save(validAd);

      let found = repository.findById(validAd.id);

      expect(found.name).to.eq(validAd.name);

      repository.delete(found);

      found = repository.findById(validAd.id);
      expect(found).to.be.null;
    });

    it("can update", () => {
      const repository = new AdRepository();
      const initialRepositoryLenth = repository.length;
      repository.save(validAd);

      let found = repository.findById(validAd.id);

      expect(found).not.be.null;
      expect(found.name).to.eq(validAd.name);
      const newName = 'renan'
      found.name = newName;
      repository.save(found);

      found = repository.findById(validAd.id);

      expect(found).not.be.null;
      expect(found.name).to.eq(newName);
    });
  });
});