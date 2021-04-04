const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../Models/user.model');
const { authSchema } = require('../Helpers/validation_schema');
const { signAccessToken } = require('../Helpers/jwt_helper');
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

      const accessToken = await signAccessToken(savedUser.id);
      const userId = savedUser.id;
      res.send({ accessToken, userId });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  //SignIn or Login
  loginUser: async (req, res, next) => {
    // res.send(req.body);
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound('User not registered');

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid');

      const accessToken = await signAccessToken(user.id);
      res.send({ accessToken });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'));
      next(error);
    }
  },
};
