const express = require('express');
const app = express();
const initApi = require('./api');
const createDeps = require('./deps');

const config = {
  port: process.env.PORT || 4000,
  redisURL: process.env.REDIS_URL,
  slackWebhook: process.env.SLACK_WEBHOOK,
  slackChannel: process.env.SLACK_CHANNEL,
  gcmAPIKey: process.env.GCM_API_KEY,
  awsConfig: {region:process.env.aws_region, accessKeyId: process.env.aws_accesskeyid, secretAccessKey: process.env.aws_secretaccesskey}
};

const deps = createDeps(config);

app.use(initApi(deps));

app.listen(config.port, function () {
  console.log(`API running on http://localhost:${config.port}`);
});
