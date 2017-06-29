const express = require('express');
const cors = require('cors');
const sessionsAPI = require('./sessions');
const eventsAPI = require('./events');
const bodyParser = require('body-parser');

module.exports = deps => {
  const router = new express.Router();

  router.use(cors());
  router.use(bodyParser.json());

  router.use('/sessions', sessionsAPI(deps));
  router.use('/events', eventsAPI(deps));

  router.get('/', (req, res) => {
    res.send({status: 'API OK'});
  });

  return router;
};