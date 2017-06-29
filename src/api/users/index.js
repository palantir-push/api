const express = require('express');

module.exports = ({userRepository, eventRepository, webPush}) => {
  const router = new express.Router();

  router.post('/:userId', (req, res) => {
    const data = req.body;
    if(!data.endpoint || !data.key || !data.authSecret){
      return res.status(400).send('Error: Requires json with values endpoint, key and authSecret');
    }

    return userRepository.set(req.params.userId, data)
      .then(() => res.send('ok!'));
  });

  router.get('/:userId', (req, res) => {
    userRepository.get(req.params.userId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send(err.toString());
      });
  });

  router.get('/:userId/push', (req, res) => {
    userRepository.get(req.params.userId)
      .then(data => webPush.sendNotification(data, 'Hello World'))
      .then(ret => res.send(ret))
      .catch(err => {
        res.status(500).send(err);
      });
  });

  router.get('/:userId/jobs', (req, res) => {
    eventRepository.list(req.params.userId)
      .then(events => {
        res.send(events);
      }, err => {
        res.status(500).send(err);
      });
  });

  return router;
};
