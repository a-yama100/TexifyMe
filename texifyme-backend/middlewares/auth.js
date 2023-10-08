// E:\programming\Project\TexifyMe\texifyme-backend\middlewares\auth.js

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'No token provided.' });

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Failed to authenticate token.' });
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    });
  };

  exports.requireRole = (role) => {
    return (req, res, next) => {
      if (req.isAdmin || req.role === role) {
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  };
