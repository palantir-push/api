const express = require('express');

module.exports = ({eventRepository}) => {
  const router = new express.Router();

  router.get('/:jobId', (req, res) => {
    eventRepository.get(req.params.jobId)
      .then(event => {
        res.send(event);
      }, err => {
        res.status(500).send(err);
      });
  });

  return router;
};