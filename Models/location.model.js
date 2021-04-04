const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  CAR,
  BIKE,
  SEDAN,
  SUV,
  HATCHBACK,
  DIRTBIKE,
  CRUSIER,
  SPORTSBIKE,
  PETROL,
  CNG,
  DIESEL,
} = require('../constant.js');

const LocationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
  },

  fullAddress: {
    type: String,
    required: true,
    unique: true,
  },

  cityName: {
    type: String,
    required: true,
  },

  pinCode: {
    type: Number,
    required: true,
    min: 100000,
  },
});

const Location = mongoose.model('location', LocationSchema);
module.exports = Location;
