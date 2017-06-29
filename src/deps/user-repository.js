const Redis = require('ioredis');

module.exports = ({config}) => {
  const redis = new Redis(config.redisURL, {
    keyPrefix: 'user:'
  });

  redis.set('n06867', JSON.stringify({test: 42}));

  return {
    set(userId, data) {
      return redis.set(userId, JSON.stringify(data));
    },
    get(userId) {
      return redis.get(userId)
        .then(data => {
          if (!data) {
            return Promise.reject(new Error(`No data for id ${userId}`));
          }

          return Promise.resolve(JSON.parse(data));
        });
    }
  };
};
