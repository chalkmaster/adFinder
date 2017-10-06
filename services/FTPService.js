var Client = require('ftp');
var fs = require('fs');

var c = new Client();
c.on('ready', function() {
  c.mkdir('/42066208817/',(err) => {
      c.put('./mediaStore/42066208817/8877efe0-2c81-b7da-cceb-821884380776.jpg', '/42066208817/8877efe0-2c81-b7da-cceb-821884380776.jpg', function(err) {
        if (err) throw err;
        c.end();
      });
  });
});
// connect to localhost:21 as anonymous 
c.connect({
    host:'vendamaisgloblalpeace.com.br',
    user:'adfinder',
    password:'1123581321'
});