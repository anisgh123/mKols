const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;  // This ensures you're exporting a function, not an object.
