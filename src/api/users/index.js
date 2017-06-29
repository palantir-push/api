const express = require('express');

module.exports = ({userRepository, eventRepository}) => {
  const router = new express.Router();

  router.get('/:userId', (req, res) => {
    userRepository.get(req.params.userId)
      .then(data => res.send(data))
      .catch(err => {
        res.status(404).send(err.toString());
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
