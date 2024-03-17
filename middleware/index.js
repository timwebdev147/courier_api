const jwt = require( 'jsonwebtoken');
// models

const authorize = (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(400).json({ success: false, message: 'No access token provided' });
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req._id = decoded._id;
      return next();
    } catch (error) {
  
      return res.status(401).json({ success: false, message: error.message });
    }
  }


  module.exports = {authorize}