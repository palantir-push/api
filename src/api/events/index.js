const express = require('express');

module.exports = ({slack}) => {
  const router = new express.Router();

  router.post('/', (req, res) => {
    const body = req.body;
    slack.send(`Wohoo! Fikk akkurat data fra Jarle! ${JSON.stringify(body)}`);
    res.send({received: body});
  });

  return router;
};