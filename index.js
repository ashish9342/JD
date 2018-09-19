const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("mongo connected");
})

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users', userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
