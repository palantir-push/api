const express = require('express');


module.exports = ({config, slack, eventRepository, aws}) => {
  const router = new express.Router();
  const getURLPrefix = req => {
    //const port = (config.port === 80 || config.port === 443) ? '' : `:${config.port}`;
    const port = '';
    return `${req.protocol}://${req.hostname}${port}`;
  };

  router.post('/', (req, res) => {
    const urlPrefix = getURLPrefix(req);
    const data = req.body;
    const {owner, jobId} = data;
    const jobURL = `${urlPrefix}/jobs/${jobId}`;

    aws.publish({
      TopicArn: `arn:aws:sns:eu-west-1:099317323916:${owner}`,
      Message: 'Jobb fullført',
      Subject: 'Palantir'
    });

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