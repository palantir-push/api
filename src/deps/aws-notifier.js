/* eslint-disable camelcase */
const AWS = require('aws-sdk');

module.exports = config => {
  if(!config.awsConfig.region) {
      return null;
  }
  var sns = new AWS.SNS(config.awsConfig);
  return {
      publish(params) {
          sns.publish(params, function(err,data){
              if (err) console.log('Error sending a message', err);
              else console.log('Sent message:', data.MessageId);
          });
      },

      createTopic(params) {
          sns.createTopic(params, function(err, data) {
              if (err) console.log(err, err.stack);
              else     console.log(data);
          });
      }
  };
};