const jwt = require('jsonwebtoken');

const verifyCookie = (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.auth_token;

    // If no token is found, respond with unauthorized
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying cookie:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyCookie;
