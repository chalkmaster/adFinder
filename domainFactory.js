const AdRepository = require('./infrastructure/repository/AdRepository');
const AdService = require('./services/AdService');

function buildAdRepository() {
  return new AdRepository();
}

function buildAdService() {
  let repository = buildAdRepository();
  return new AdService(repository, null);
}

module.exports = {
  buildAdRepository,
  buildAdService,
}