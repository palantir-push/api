const Redis = require('ioredis');

module.exports = config => {
  if (!config.redisURL) {
    return null;
  }

  const redis = new Redis(config.redisURL, {
    keyPrefix: 'user:'
  });

  return {
    set(userId, data) {
      return redis.set(userId, JSON.stringify(data));
    },
    remove(userId) {
      return redis.del(userId);
    },
    get(userId) {
      return redis.get(userId)
        .then(data => {
          if (!data) {
            return Promise.reject(new Error(`No data for id ${userId}`));
          }

          return JSON.parse(data);
        });
    }
  };
};
