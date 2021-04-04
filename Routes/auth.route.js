const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../Models/User.model');
const { authSchema } = require('../Helpers/validation_schema');
// const { signAccessToken } = require('../Helpers/jwt_helper');

router.post('/hirewheels/v1/users', async (req, res, next) => {
  //   res.send(req.body);
  // res.send("Register Route");

  try {
    //const {email,password} = req.body
    // if(!email || !password) throw createError.BadRequest()

    const result = await authSchema.validateAsync(req.body);
    console.log(result);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered`);

    // const user = new User({ email:email,password:password })
    const user = new User(result);

    const savedUser = await user.save();

    const accessToken = await signAccessToken(savedUser.id);
    const userId = savedUser.id;
    res.send({ accessToken, userId });

    //res.send(savedUser);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

router.post('/hirewheels/v1/users/access-token', async (req, res, next) => {
  res.send('Login Route');
  // try {
  //     const result = await authSchema.validateAsync(req.body)
  //     const user = await User.findOne({ email: result.email })
  //     if (!user) throw createError.NotFound('User not registered')

  //     const isMatch = await user.isValidPassword(result.password)
  //     if (!isMatch)
  //         throw createError.Unauthorized('Username/password not valid')

  //     const accessToken = await signAccessToken(user.id)

  //     res.send({ accessToken })

  // } catch (error) {
  //     if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
  //     next(error);

  // }
});

router.post('/refresh-token', async (req, res, next) => {
  res.send('Refresh Token Route');
});

router.delete('/logout', async (req, res, next) => {
  res.send('Logout Route');
});

module.exports = router;
