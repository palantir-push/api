/* eslint-disable camelcase */
const SlackWebhook = require('slack-webhook');

module.exports = config => {
  const slack = new SlackWebhook(config.slackWebhook, {
    defaults: {
      username: 'Palantir',
      channel: config.slackChannel,
      icon_emoji: ':rocket:'
    }
  });

  return {
    send(message) {
      slack.send(message);
    }
  };
};