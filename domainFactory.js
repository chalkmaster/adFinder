const AdService = require('./services/AdService');
const RatingService = require('./services/RatingService');
const UserService = require('./services/UserService');

const AdRepository = require('./infrastructure/repository/AdRepository');
const MediaRepository = require('./infrastructure/repository/MediaRepository');
const RatingRepository = require('./infrastructure/repository/RatingRepository');
const UserRepository = require('./infrastructure/repository/UserRepository');
const AproveRepository = require('./infrastructure/repository/AproveRepository');


function buildAdRepository() {
  return new AdRepository();
}

function buildMediaRepository() {
  return new MediaRepository();
}

function buildRatingRepository() {
  return new RatingRepository();
}

function buildUserRepository() {
  return new UserRepository();
}

function buildAdService() {
  let adRepository = buildAdRepository();
  let mediaRepository = buildMediaRepository();
  return new AdService(adRepository, mediaRepository, new AproveRepository());
}

/**
 * @returns {RatingService}
 */
function buildRatingService() {
  let ratingRepository = buildRatingRepository();
  return new RatingService(ratingRepository, new AproveRepository());
}

function buildUserService() {
  let userRepository = buildUserRepository();
  return new UserService(userRepository);
}

module.exports = {
  buildAdService,
  buildRatingService,
  buildAdRepository,
  buildMediaRepository,
  buildRatingRepository,
  buildUserService,
}