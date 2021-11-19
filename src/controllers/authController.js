const { Router } = require('express');
const router = Router();

const User = require('../models/User');

router.post('/singup', (req, res, next) => {
  // res.json('singup');
  const { username, email, password } = req.body;
  // user.create({
  //   username,
  //   email,
  //   password,
  // });
  const user = new User({
    username,
    email,
    password,
  });

  console.log(user);
  res.json({ message: 'received' });
});

router.post('/singin', (req, res, next) => {
  res.json('singin');
});

router.get('/me', (req, res, next) => {
  res.json('me');
});

module.exports = router;
