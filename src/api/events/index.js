const express = require('express');


module.exports = ({config, slack, eventRepository}) => {
  const router = new express.Router();
  const getURLPrefix = req => {
    const port = (config.port === 80 || config.port === 443) ? '' : `:${config.port}`;
    return `${req.protocol}://${req.hostname}${port}`;
  };

  router.post('/', (req, res) => {
    const urlPrefix = getURLPrefix(req);
    const data = req.body;
    const {owner, jobId} = data;
    const jobURL = `${urlPrefix}/jobs/${jobId}`;

    slack.send(`Mottok jobb for ${owner}: ${jobURL}`);
    eventRepository.add(jobId, owner, data)
      .then(() => {
        res.send({
          links: {
            job: jobURL,
            userJobs: `${urlPrefix}/users/${owner}/jobs`
          },
          received: data
        });
      }, err => {
        res.status(500).send(err);
      });

  });

  return router;
};