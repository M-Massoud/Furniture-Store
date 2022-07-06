const express = require('express');
// remove at deployment
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const loginAdminRoute=require("./Routes/loginAdminRoute");
const loginUserRoute=require("./Routes/loginUserRoute");
const forgotUserPasswordRoute = require("./routes/forgotUserPasswordRoute");
const changeUserPasswordRoute = require("./routes/changeUserPasswordRoute");
const usersRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const ordersRoute = require('./routes/ordersRoute');
const adminRoute = require('./routes/adminRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');

const server = express();
const port = 8080;
// const port = 8081;

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

//a- Middleware to write request url and method
server.use(morgan('tiny'));

// b- Middle ware for CORS Package to allow Users reach your site.
server.use(cors());

// routes
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get('/home', (request, response) => {
  response.send('this is the home page');
});

server.use(forgotUserPasswordRoute);
server.use(loginAdminRoute);
server.use(loginUserRoute);
server.use(usersRoute);
server.use(productsRoute);
server.use(ordersRoute);
server.use(adminRoute);
server.use(categoryRoute);
server.use(subCategoryRoute);
server.use(changeUserPasswordRoute);

// c- General middleware for not Found url pathes with 404 status code.
server.use((request, response) => {
  response.status(404).send('Page Not Found');
});

// d- One Error handling middleware
server.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: 'Internal Error' + error });
});

// DB_URL="mongodb://localhost:27017/furnitureStoreDB"
// DB_URL="mongodb://0.0.0.0:27017/furnitureStoreDB'
// port 8080 || 8081
