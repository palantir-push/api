const createUserRepository = require('./user-repository');
const createEventRepository = require('./event-repository');
const createSlackNotifier = require('./slack-notifier');

module.exports = config => {
  return {
    config,
    userRepository: createUserRepository(config),
    eventRepository: createEventRepository(config),
    slack: createSlackNotifier(config)
  };
};