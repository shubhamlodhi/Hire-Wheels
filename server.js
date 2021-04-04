//Server.js

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
// const User = require('./Models/User.model');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./Helpers/init_mongodb');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

// const { verifyAccessToken } = require('./helpers/jwt_helper');

// app.use(cors({ origin: true }));

const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log('** Origin of request ' + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('Origin acceptable');
      callback(null, true);
    } else {
      console.log('Origin rejected');
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// const BoardRoute = require('./Routes/Board.route');
const VehicleRoute = require('./Routes/vehicles.route');
// const TaskRoute = require('./Routes/Task.route');

app.get('/', async (req, res, next) => {
  try {
    // const user = await User.find({});
    res.send('Hello From Express Server');
    // res.send(user);
  } catch (error) {
    next(error);
  }
});

app.use('/hirewheels', VehicleRoute);

// app.use('/board', BoardRoute)

// app.use('/task', TaskRoute)

app.use(async (req, res, next) => {
  // const error = new Error('Not Found');
  // error.status = 404;
  //next(error);
  next(createError.NotFound('This Route doesnt exist'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT, () => {
  console.log(`Server is running on Port -> ${PORT}`);
});
