const LINE_CHANNEL_ACCESS_TOKEN = 'MJkFsPtOsd78RtnSaLotsmt+rrnQaFU18w5nOZbcGrGFlxNKym/hK+b8mwusULHLa8wa3jR5RPX7WzwqBtE805GFKebRwxMBjpgsH3zYm5/pBnA24Mgpe14ICsqv1o8EXXrs2Q7VeW1ZbhGZTx9BRAdB04t89/1O/w1cDnyilFU=';

var request = require('request');

module.exports = class dietitian {
    static replyTotalCalorie(replyToken, foodList){
        var totalCalorie = 0;
        for (var food of foodList){
            totalCalorie += food.calorie;
        }
        var totalProtein = 0; ///////////////タンパク質自分で追記/////////////
        for (var food of foodList){
            totalProtein += food.protein;
        }

        var totalCarb = 0; ///////////////炭水化物自分で追記/////////////
        for (var food of foodList){
            totalCarb += food.carb;
        }

        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        }
        var body = {
            replyToken: replyToken,
            messages: [{
                type: 'text',
                text: 'カロリーは' + totalCalorie + 'kcal、'+'タンパク質'+ totalProtein+'g、'+'炭水化物'+ totalCarb+'gです！' ///////////////kcal以降自分で追記/////////////
            }]
        }
        var url = 'https://api.line.me/v2/bot/message/reply';
        request({
            url: url,
            method: 'POST',
            headers: headers,
            body: body,
            json: true
        });
    }

    static askWhichFood(replyToken, foodList){
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
        }
        var body = {
            replyToken: replyToken,
            messages: [{
                type: 'template',
                altText: 'どの食品が最も近いですか？',
                template: {
                    type: 'buttons',
                    text: 'どの食品が最も近いですか？',
                    actions: []
                }
            }]
        }

        // Templateメッセージのactionsに確認すべき食品を追加。
        for (var food of foodList){
            body.messages[0].template.actions.push({
                type: 'postback',
                label: food.food_name,
                data: JSON.stringify(food)
            });

            // 現在Templateメッセージに付加できるactionは4つまでのため、5つ以上の候補はカット。
            if (body.messages[0].template.actions.length == 4){
                break;
            }
        }

        var url = 'https://api.line.me/v2/bot/message/reply';
        request({
            url: url,
            method: 'POST',
            headers: headers,
            body: body,
            json: true
        });
    }
}

