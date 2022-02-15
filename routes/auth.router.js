const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {config} = require('../config/config');

const router = express.Router();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const token = jwt.sign({
        sub: req.user.id,
        role: req.user.role
      }, config.jwtSecret)

      res.json({
        user: req.user,
        token
      });

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
