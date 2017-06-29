const express = require('express');
const app = express();
const initApi = require('./api');

const config = {
  port: process.env.PORT || 4000,
};

app.use(initApi({config}));

app.listen(config.port, function () {
  console.log(`API running on http://localhost:${config.port}`);
});
