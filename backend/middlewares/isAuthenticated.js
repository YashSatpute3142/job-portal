import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        

        const token = req.cookies.token;

        if (!token) {
            console.log("NO TOKEN");
            return res.status(401).json({
                message: "User not Authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        

        req.id = decode.userId;

        next();

    } catch (error) {
        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;