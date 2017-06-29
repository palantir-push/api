const express = require('express');

module.exports = ({userRepository}) => {
  const router = new express.Router();

  router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    userRepository.get(userId)
      .then(data => res.send(data))
      .catch(err => {
        res.status(404).send(err.toString());
      });
  });

  return router;
};