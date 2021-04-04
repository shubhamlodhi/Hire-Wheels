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

const VehicleSchema = new Schema({
  vehicleModel: {
    type: String,
    required: true,
  },

  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },

  vehicleOwner: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    enum: [CAR, BIKE],
  },

  fuelType: {
    type: String,
    enum: [PETROL, CNG, DIESEL],
  },

  vehicleColor: {
    type: String,
    required: true,
  },

  vehicleImage: {
    type: String,
    required: true,
  },

  vehicleSubcategory: {
    type: String,
    validate: {
      validator: function (value) {
        if (this.vehicleType === CAR) {
          return [SEDAN, SUV, HATCHBACK].includes(value);
        } else if (this.vehicleType === BIKE);
        {
          return [DIRTBIKE, CRUSIER, SPORTSBIKE].includes(value);
        }
      },
    },
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
  },

  pricePerHour: {
    type: Number,
    required: true,
  },
});

const Vehicle = mongoose.model('vehicle', VehicleSchema);
module.exports = Vehicle;
