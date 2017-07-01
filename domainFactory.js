const AdRepository = require('./infrastructure/repository/AdRepository');
const MediaRepository = require('./infrastructure/repository/MediaRepository');
const AdService = require('./services/AdService');


function buildAdRepository() {
  return new AdRepository();
}

function buildMediaRepository() {
  return new MediaRepository();
}

function buildAdService() {
  let repository = buildAdRepository();
  return new AdService(repository, null);
}

module.exports = {
  buildAdRepository,
  buildAdService,
  buildMediaRepository,
}