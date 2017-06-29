const express = require('express');
const cors = require('cors');

module.exports = ({config}) => {
  const router = new express.Router();

  router.use(cors());
  router.get('/', (req, res) => {
    res.send({status: 'API OK'});
  });

  return router;
};