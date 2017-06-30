const express = require('express');
const cors = require('cors');
const eventsAPI = require('./events');
const usersAPI = require('./users');
const jobsAPI = require('./jobs');
const bodyParser = require('body-parser');
const awsAPI = require('./aws');

module.exports = deps => {
  const router = new express.Router();

  router.use(cors());
  router.use(bodyParser.json());

  router.use('/events', eventsAPI(deps));
  router.use('/users', usersAPI(deps));
  router.use('/jobs', jobsAPI(deps));
  router.use('/aws', awsAPI(deps));

  router.get('/', (req, res) => {
    res.send({status: 'API OK'});
  });

  return router;
};