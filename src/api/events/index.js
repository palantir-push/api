const express = require('express');

module.exports = ({slack, eventRepository}) => {
  const router = new express.Router();

  router.post('/', (req, res) => {
    const data = req.body;
    const {owner, jobId} = data;
    slack.send(`Mottok jobb for ${owner}: ${JSON.stringify(data)}`);
    eventRepository.add(jobId, owner, data)
      .then(() => {
        res.send({
          links: {
            job: `/jobs/${jobId}`,
            userJobs: `/users/${owner}/jobs`
          },
          received: data
        });
      }, err => {
        res.status(500).send(err);
      });

  });

  return router;
};