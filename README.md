# smison_bot_lambda
smison's twitter bot (for AWS Lambda)

- Deploy
   ```
$ git clone git@github.com:smison/smison_bot_lambda.git
$ cd smison_bot_lambda
$ mkdir node_modules
$ npm install twitter
$ npm install here
$ vi .keys
      # write Twitter keys
$ zip -r start.zip start.js node_modules .keys
$ zip -r end.zip end.js node_modules themes.txt .keys

Upload ZIPs to AWS Lambda
  - Role: Basic execution role
  - Event Source: Clowd Watch Events
  - Schedule
    - start: cron(0 13 * * ? *)
    - end:   cron(0 14 * * ? *)
   ```
