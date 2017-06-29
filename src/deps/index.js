const createUserRepository = require('./user-repository');
const createEventRepository = require('./event-repository');
const createSlackNotifier = require('./slack-notifier');
const createWebPush = require('./web-push');

module.exports = config => {
  return {
    config,
    userRepository: createUserRepository(config),
    eventRepository: createEventRepository(config),
    slack: createSlackNotifier(config),
    webPush: createWebPush(config)
  };
};