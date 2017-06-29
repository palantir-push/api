const Redis = require('ioredis');

module.exports = config => {
  if(!config.redisURL){
    return null;
  }

  const redis = new Redis(config.redisURL);

  return {
    add(jobId, userId, data) {
      const jobData = JSON.stringify(data);
      return redis.set(`events:${jobId}`, jobData)
        .then(() => {
          return redis.sadd(`userEvents:${userId}`, jobId);
        });
    },
    get(jobId) {
      return redis.get(`events:${jobId}`)
        .then(JSON.parse);
    },
    list(userId) {
      return redis.smembers(`userEvents:${userId}`)
        .then(jobIds => {
          const loaders = jobIds.map(id => redis.get(`events:${id}`).then(JSON.parse));
          return Promise.all(loaders);
        });
    }
  };
};
