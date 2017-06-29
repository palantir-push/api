const express = require('express');

module.exports = () => {
  const router = new express.Router();

  router.post('/', (req, res) => {
    const body = req.body;
    res.send({received: body});
  });

  return router;
};