const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // excludes password filed from returned document for security purpose
        if (!user) return res.status(401).json({ message: 'Invalid token' });

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = auth;