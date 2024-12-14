const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

  const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token; // Extract token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Use the same hardcoded secret as in the loginController
  const secret = "jwytfaatererhd"; 

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.vendorId; // Attach the userId to the request
    next(); // Proceed to the next middleware or controller
  });
};

module.exports = authMiddleware;
