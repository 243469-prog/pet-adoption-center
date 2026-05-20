const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'pethaven_secret_key';

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Token invalid or expired' });
  }
};

module.exports = protect;