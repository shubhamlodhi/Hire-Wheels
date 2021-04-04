const express = require('express');
const router = express.Router();

const auth = require('../Controllers/auth.js');
const vehicleController = require('../Controllers/vehicles.controller');

const { verifyAccessToken } = require('../Helpers/jwt_helper');

// Register a User
router.post('/v1/users', auth.registerUser);

//Login a User
router.post('/v1/users/access-token', auth.loginUser);

//Get a list of all vehicles
router.get('/v1/vehicles', verifyAccessToken, vehicleController.getAllvehicles);

//Create or add  a new vehicle
router.post(
  '/v1/vehicles',
  verifyAccessToken,
  vehicleController.createNewvehicle
);

//Get a vehicle by id
router.get(
  '/v1/vehicles/:id',
  verifyAccessToken,
  vehicleController.findvehicleById
);

//Update a vehicle by id
router.patch(
  '/v1/vehicles/:id',
  verifyAccessToken,
  vehicleController.updatevehicle
);

//Delete a vehicle by id
router.delete(
  '/v1/vehicles/:id',
  verifyAccessToken,
  vehicleController.deleteAvehicle
);

//Book a vehicle
router.post('/v1/bookings', verifyAccessToken, vehicleController.bookVehicle);
module.exports = router;
