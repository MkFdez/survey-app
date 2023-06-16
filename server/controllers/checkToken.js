const jwt = require('jsonwebtoken');
const express = require('express');
const checkRouter = express.Router();

checkRouter.post('/', (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET); // Verify the token with your secret key
      res.sendStatus(200); // Token is valid
    } catch (error) {
      console.error('Error verifying token:', error);
      res.sendStatus(401); // Token is invalid or expired
    }
  } else {
    res.sendStatus(401); // No token provided
  }
});

module.exports = checkRouter;
