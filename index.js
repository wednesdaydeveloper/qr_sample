var http = require("http");
var QRCode = require('qrcode');
 

http.createServer(function(req, res) {
    var msg = req.url;
    QRCode.toDataURL(msg, function(err,url){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('<!DOCTYPE html><html lang="ja"><body><img src="' + url + '"></body></html>');
    });    

}).listen(process.env.PORT);

console.log("Server running ...");