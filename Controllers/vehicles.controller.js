const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../Models/user.model');
const Vehicle = require('../Models/vehicle.model');
const Booking = require('../Models/booking.model');
const { authSchema } = require('../Helpers/validation_schema');

// const vehicle = require('../Models/vehicle.model');

module.exports = {
  //SignUp
  registerUser: async (req, res, next) => {
    // res.send(req.body);
    try {
      const result = await authSchema.validateAsync(req.body);
      console.log(result);
      const doesExist = await User.findOne({ email: result.email });
      if (doesExist)
        throw createError.Conflict(
          `${result.email} is already been registered`
        );

      // const user = new User({ email:email,password:password })
      const user = new User(result);

      const savedUser = await user.save();
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  //SignIn or Login
  loginUser: async (req, res, next) => {
    res.send(req.body);
  },

  //Get a list of all vehicles
  getAllvehicles: async (req, res, next) => {
    try {
      const results = await Vehicle.find({}, { __v: 0 });
      // const results = await vehicle.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await vehicle.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  //Create or add  a new vehicle
  createNewvehicle: async (req, res, next) => {
    try {
      const vehicle = new Vehicle(req.body);
      const result = await vehicle.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }

    /*Or:
      If you want to use the Promise based approach*/
    /*
      const vehicle = new vehicle({
        name: req.body.name,
        price: req.body.price
      });
      vehicle
        .save()
        .then(result => {
          console.log(result);
          res.send(result);
        })
        .catch(err => {
          console.log(err.message);
        }); 
        */
  },

  //Get a vehicle by id
  findvehicleById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const vehicle = await Vehicle.findById(id);
      // const vehicle = await vehicle.findOne({ _id: id });
      if (!vehicle) {
        throw createError(404, 'vehicle does not exist.');
      }
      res.send(vehicle);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid vehicle id'));
        return;
      }
      next(error);
    }
  },

  //Update a vehicle by id
  updatevehicle: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Vehicle.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'vehicle does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid vehicle Id'));
      }

      next(error);
    }
  },

  //Delete a vehicle by id
  deleteAvehicle: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Vehicle.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, 'vehicle does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid vehicle id'));
        return;
      }
      next(error);
    }
  },

  bookVehicle: async (req, res, next) => {
    try {
      const booking = new Booking(req.body);
      const result = await booking.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },
};
