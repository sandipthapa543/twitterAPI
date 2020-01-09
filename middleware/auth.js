const jwt = require('jsonwebtoken');
const config = require('../config');



// eslint-disable-next-line consistent-return
const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length);
    }
    // eslint-disable-next-line consistent-return
    jwt.verify(token, config.secret, (erorr, decoded) => {
      if (erorr) {
        return res.json({
          sucess: false,
          message: 'Token is not valid',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.json({
      sucess: false,
      message: 'Auth token is not supplied',
    });
  }
};


module.exports = checkToken;
