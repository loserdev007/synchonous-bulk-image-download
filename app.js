



const request = require('request-promise');
const fs = require('fs');

// Loop Index
let i = 0;

// Download files using request package
async function requestHandler(uri, fileName, callBack) {
   i++;
   if (uri) {
      request.head(uri, function (err, res, body) {
         request(uri).pipe(fs.createWriteStream(fileName).on('close', callBack));
      });
   }
}

// Start download... (Self call)
(async function start() {
   // [linkObj] => array of link objects with file name
   await requestHandler(linkObj[i].link, __dirname + '/data/' + linkObj[i].fileName, () => {
      if (i >= linkObj.length) return;
      start();
   });
   return;
})();