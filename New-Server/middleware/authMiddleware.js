const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

// Basic in-memory token blacklist (for demonstration purposes)
const tokenBlacklist = new Set();

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid authentication' });
	}
	const token = authHeader.split(' ')[1];

	if (tokenBlacklist.has(token)) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Token has been invalidated' });
	}

	try {
		const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { username, userid };
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid authentication' });
	}
};

const logout = (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'No token provided' });
	}
	const token = authHeader.split(' ')[1];
	tokenBlacklist.add(token);
	return res.status(StatusCodes.OK).json({ msg: 'Logged out successfully' });
};

module.exports = { authMiddleware, logout };
