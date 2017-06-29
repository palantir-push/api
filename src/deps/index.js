const createUserRepository = require('./user-repository');

module.exports = config => {
  return {
    config,
    userRepository: createUserRepository({config})
  };
};