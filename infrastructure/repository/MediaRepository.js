const fs = require('fs');
const guid = require('guid');
const Client = require('ftp');

const basePath = './mediaStore/';

module.exports = class MediaRepository{
  retrieveMediaFor(adId, callBack){
    let data = [];
    // const fullPath = basePath + adId;
    
    // if (fs.existsSync(fullPath))
    //   data = fs.readdirSync(fullPath);

    // return data;
    //const fullPath = basePath + '/' + adId + '/' + mediaName;    
    var c = new Client();
    c.on('ready', function() {
      c.list(`/${adId}/`,(err, list) => {
        if (err) return [];
        callBack(list.map((file) => file.name));
        c.end();
      });
    });
    c.connect({
        host:'vendamaisgloblalpeace.com.br',
        user:'adfinder',
        password:'1123581321'
    });
    //return fs.readFileSync(fullPath);
  }

  salveMediaFor(adId, mediaData, callBack){
    if (!mediaData)
      return false;

    const fullPath = basePath + adId;

    if (!fs.existsSync(fullPath))
      fs.mkdirSync(fullPath)

    let name = guid.raw() + '.jpg';
    let fileName = fullPath + '/' + name; 
    fs.writeFileSync(fileName, mediaData);

    var c = new Client();
    c.on('ready', function() {
      c.mkdir(`/${adId}/`,(err) => {
          c.put(fileName, `/${adId}/${name}`, function(err) {
            if (err) throw err;
            c.end();
            callBack();
          });
      });
    });
    // connect to localhost:21 as anonymous 
    c.connect({
        host:'vendamaisgloblalpeace.com.br',
        user:'adfinder',
        password:'1123581321'
    });

    return true;
  }

  getMedia(adId, mediaName){
    const fullPath = basePath + '/' + adId + '/' + mediaName;
    return fs.readFileSync(fullPath);    
  }

  removeMedia(adId, mediaName){
    // const fullPath = basePath + '/' + adId + '/' + mediaName;
    // return fs.unlinkSync(fullPath);    
    var c = new Client();
    c.on('ready', function() {
      c.delete(`/${adId}/${mediaName}`,(err) => {
        if (err) throw err;
        c.end();
      });
    });
    c.connect({
        host:'vendamaisgloblalpeace.com.br',
        user:'adfinder',
        password:'1123581321'
    });
  }
}