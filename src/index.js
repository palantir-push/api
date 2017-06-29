const express = require('express');
const app = express();
const initApi = require('./api');
const createDeps = require('./deps');

const config = {
  port: process.env.PORT || 4000,
  redisURL: process.env.REDIS_URL,
  slackWebhook: process.env.SLACK_WEBHOOK
};

const deps = createDeps(config);

app.use(initApi(deps));

app.listen(config.port, function () {
  console.log(`API running on http://localhost:${config.port}`);
});
