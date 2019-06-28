const jwt = require('jsonwebtoken');
const User = require('../models/users');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'sriramteja'); // { _id: '5d15227ebf76b370e0cb4ae4', iat: 1561680367 }
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    //creating a user object on the req object
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'please authenticated' });
  }
};

module.exports = auth;
