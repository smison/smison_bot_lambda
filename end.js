var Twitter = require('twitter');
var here = require('here').here;
var fs = require('fs');

/* define Func */
function shuffleAry(ary) {
	var i = ary.length;
	while(i){
		var j = Math.floor(Math.random()*i);
		var t = ary[--i];
		ary[i] = ary[j];
		ary[j] = t;
	}
	return ary;
}

/* read Themes */
var buf = fs.readFileSync("themes.txt");
var lines = buf.toString().trim();
var themes = lines.split("\n");
themes = shuffleAry(themes);

/* read Keys */
var keys_buf = fs.readFileSync(".keys");
var keys_lines = keys_buf.toString().trim();
var keys = keys_lines.split("\n");

/* create Twitter Client */
var client = new Twitter({
	consumer_key: keys[0],
	consumer_secret: keys[1],
	access_token_key: keys[2],
	access_token_secret: keys[3]
});

/* create Tweet */
var text = here(/*
	お疲れ様でした、終了です。
	次回のお題は「theme1」「theme2」「theme3」となります。
	ルール:
	1. 22:00～23:00 で作画
	2. #深夜の60分創作 タグをつけて投稿
	*/).unindent()
	.replace(/theme1/, themes[0])
	.replace(/theme2/, themes[1])
	.replace(/theme3/, themes[2])
	.trim();

/* Tweet(Lambda Func) */
exports.handler = function(event, context) {
	client.post('statuses/update', {status: text},  function(error, tweet, response){
	if(error) {
		return context.fail('tweet failed');
	}
	context.succeed('tweet success');
	});
};
