require("dotenv").config();
const Users = require("../models/usersModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../utils/validation/usersValidation");
const { userDTO } = require("../utils/dto/usersDto");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { error } = registerValidation.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            let { username, email, password } = req.body;

            let userExist = await Users.findOne({ email });
            if (userExist) {
                return res.status(409).json({
                    status: false,
                    message: "Email is already registered!"
                });
            }

            let encryptedPassword = await bcrypt.hash(password, 10);

            let newUser = new Users({ 
                username, 
                email, 
                password: encryptedPassword });
            await newUser.save();

            return res.status(201).json({
                status: true,
                message: "User registered successfully",
                data: userDTO(newUser)
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { error } = loginValidation.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: error.details[0].message
                });
            }

            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }

            const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: "1h" });

            return res.status(200).json({
                status: true,
                message: "Login successful",
                token,
                data: userDTO(user),
            });
        } catch (err) {
            next(err);
        }
    },
};