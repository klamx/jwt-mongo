const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
// const config = require('../config');

const User = require('../models/User');

router.post('/singup', async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });

  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  res.json({ auth: true, token });
});

router.post('/singin', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("The email doesn't exist");
  }

  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    return res.status(401).json({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });
  res.json({ auth: true, token });
});

router.get('/me', async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log(decoded);
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) {
      return res.status(404).send('No user found');
    }

    res.json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
