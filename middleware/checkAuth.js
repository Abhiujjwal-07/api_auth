const JWT = require("jsonwebtoken");
module.exports = async(req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        console.log("11");
        return res.status(400).json({
            errors: [{
                msg: "no token found",
            }, ],
        });
    }

    try {
        let user = await JWT.verify(token, process.env.SECRET_KEY);
        req.user = user.email;
        console.log("22");
        next();
    } catch (error) {
        console.log("33");
        return res.status(400).json({
            errors: [{
                msg: "token invalid",
            }, ],
        });
    }
};