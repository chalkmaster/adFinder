const fs = require('fs');
const guid = require('guid');

const basePath = './mediaStore/';

module.exports = class MediaRepository{
  retrieveMediaFor(adId){
    let data = [];
    const fullPath = basePath + adId;
    
    if (fs.existsSync(fullPath))
      data = fs.readdirSync(fullPath);

    return data;
  }

  salveMediaFor(adId, mediaData){
    if (!mediaData)
      return false;

    const fullPath = basePath + adId;

    if (!fs.existsSync(fullPath))
      fs.mkdirSync(fullPath)

    let fileName = fullPath + '/' + guid.raw() + '.jpg';
    fs.writeFileSync(fileName, mediaData);

    return true;
  }

  getMedia(adId, mediaName){
    const fullPath = basePath + '/' + adId + '/' + mediaName;
    return fs.readFileSync(fullPath);    
  }

  removeMedia(adId, mediaName){
    const fullPath = basePath + '/' + adId + '/' + mediaName;
    return fs.unlinkSync(fullPath);    
  }
}