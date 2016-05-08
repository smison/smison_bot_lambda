var Twitter = require('twitter');
var fs = require('fs');

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
var text = "開始の時間となりました。";

/* Tweet(Lambda Func) */
exports.handler = function(event, context) {
	client.post('statuses/update', {status: text},  function(error, tweet, response){
	if(error) {
		return context.fail('tweet failed');
	}
	context.succeed('tweet success');
	});
};
