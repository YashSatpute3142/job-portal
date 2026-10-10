import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
   
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            message: "Token cookie missing",
            success: false
        });
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;