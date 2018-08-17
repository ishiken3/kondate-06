// -----------------------------------------------------------------------------
// 定数の設定
const LINE_CHANNEL_ACCESS_TOKEN = 'MJkFsPtOsd78RtnSaLotsmt+rrnQaFU18w5nOZbcGrGFlxNKym/hK+b8mwusULHLa8wa3jR5RPX7WzwqBtE805GFKebRwxMBjpgsH3zYm5/pBnA24Mgpe14ICsqv1o8EXXrs2Q7VeW1ZbhGZTx9BRAdB04t89/1O/w1cDnyilFU='; // 追加

// -----------------------------------------------------------------------------
// モジュールのインポート
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var mecab = require('mecabaas-client'); // 追加
var app = express();

// -----------------------------------------------------------------------------
// ミドルウェア設定
app.use(bodyParser.json()); // 追加

// -----------------------------------------------------------------------------
// Webサーバー設定
var port = (process.env.PORT || 3000);
var server = app.listen(port, function() {
    console.log('Node is running on port ' + port);
});

// -----------------------------------------------------------------------------
// ルーター設定
app.post('/webhook', function(req, res, next){
    res.status(200).end();
    for (var event of req.body.events){
        if (event.type == 'message' && event.message.text){
             // Mecabクラウドサービスでメッセージを解析
            mecab.parse(event.message.text)
            .then(
                function(response){
                      // 解析結果を出力
                    console.log(response);
                }
            );

        }
    }
});