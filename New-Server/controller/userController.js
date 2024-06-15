const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

// Register User
async function register(req, res) {
    const { username, firstname, lastname, email, password } = req.body;
if (!email || !username || !firstname || !lastname || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide all required fields" });
}

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "already registered user" });
        }

        if (password.length <= 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('User registered:', newUser);
        return res.status(StatusCodes.CREATED).json({ msg: "user created" });
    } catch (error) {
        console.log(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later" });
    }
}

// Login User
async function login(req, res) {
    const { email, password } = req.body;
    if (!(email || password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please enter all required fields" });
    }

    try {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential, not registered" });
    }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential, wrong password" });
        }

        const username = user.username;
        const userid = user._id;
        const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log('User login:', username);
        return res.status(StatusCodes.OK).json({ msg: "user login successfully", token, username });
    } catch (error) {
            console.log(error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later" });
        }
}

// Check User
async function checkUser(req, res) {
    const username = req.user.username;
    const userid = req.user.userid;
    res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
