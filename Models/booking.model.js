const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  pickUpDate: {
    type: Date,
    // required: true,
    default: Date.now(),
  },

  dropOffDate: {
    type: Date,
    // required: true,
    default: Date.now(),
  },

  bookingDate: {
    type: Date,
    // required: true,
    default: Date.now(),
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicle',
  },

  amount: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('booking', BookingSchema);
module.exports = Booking;
