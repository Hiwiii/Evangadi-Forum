const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid authentication' });
	}
	const token = authHeader.split(' ')[1];

	try {
		const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { username, userid };
		next();
	} catch (error) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'invalid authentication' });
	}
};

module.exports = authMiddleware;
