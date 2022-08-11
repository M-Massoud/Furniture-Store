const mongoose = require('mongoose');
const server = require('./app');
require('dotenv').config();

// start the server and connect the DB
const port = 8080;

// connect to database and express server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB Connected');
    server.listen(process.env.port || port, () => {
      console.log('the server is up and currently listening');
    });
  })
  .catch(error => console.log('Db Connection Error ' + error));

