
var http = require( 'http' );           //  HTTPモジュール読み込み
var QRCode = require('qrcode');         //  QRコードモジュール読み込み
var socketio = require( 'socket.io' );  //  Socket.IOモジュール読み込み
var fs = require( 'fs' );               //  ファイル入出力モジュール読み込み

// HTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
    res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
    res.end( fs.readFileSync('./index.html', 'utf-8') );  // index.htmlの内容を出力
}).listen(process.env.PORT);

// サーバーをソケットに紐付ける
var io = socketio.listen( server );

// 接続確立後の通信処理部分を定義
io.sockets.on( 'connection', function( socket ) {

    // QRコードを送り返す
    socket.on( 'c2s_message', function( data ) {
        QRCode.toDataURL(data.value, function(err,url){
            socket.emit( 's2c_message', { qrcode :  url} );
        });    
    });
});
