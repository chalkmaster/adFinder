const AdService = require('./services/AdService');
const RatingService = require('./services/RatingService');

const AdRepository = require('./infrastructure/repository/AdRepository');
const MediaRepository = require('./infrastructure/repository/MediaRepository');
const RatingRepository = require('./infrastructure/repository/RatingRepository');


function buildAdRepository() {
  return new AdRepository();
}

function buildMediaRepository() {
  return new MediaRepository();
}

function buildRatingRepository() {
  return new RatingRepository();
}

function buildAdService() {
  let adRepository = buildAdRepository();
  let mediaRepository = buildMediaRepository();
  return new AdService(adRepository, mediaRepository);
}

function buildRatingService() {
  let ratingRepository = buildRatingRepository();
  return new RatingService(ratingRepository);
}

module.exports = {
  buildAdService,
  buildRatingService,
  buildAdRepository,
  buildMediaRepository,
  buildRatingRepository,
}