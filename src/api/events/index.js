const express = require('express');

module.exports = ({slack}) => {
  const router = new express.Router();

  router.post('/', (req, res) => {
    const body = req.body;
    slack.send(JSON.stringify(body));
    res.send({received: body});
  });

  return router;
};