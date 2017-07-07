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
  let adRepository = buildAdRepository();
  let mediaRepository = buildMediaRepository();
  return new AdService(adRepository, mediaRepository);
}

module.exports = {
  buildAdRepository,
  buildAdService,
  buildMediaRepository,
}