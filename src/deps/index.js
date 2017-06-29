const createUserRepository = require('./user-repository');
const createSlackNotifier = require('./slack-notifier');

module.exports = config => {
  return {
    config,
    userRepository: createUserRepository(config),
    slack: createSlackNotifier(config)
  };
};