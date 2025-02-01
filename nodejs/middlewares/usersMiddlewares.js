const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    restrict: (req, res, next) => {
        let token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                status: false,
                message: "Access Denied. No Token Provided."
            });
        }

        try {
            let verified = jwt.verify(token, JWT_SECRET_KEY);
            req.user = verified; // Menyimpan data pengguna ke request object
            next();
        } catch (error) {
            return res.status(401).json({
                status: false,
                message: "Invalid Token"
            });
        }
    }
}