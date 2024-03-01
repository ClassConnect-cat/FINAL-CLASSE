const { verifyToken } = require("../services/auth");

const requireLogin = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("No token provided");
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
}
const requireProfe = (req, res, next) => {
    if(req.user?.profe)
        next();
    else 
        return res.status(403).send("Not a teacher");
}

module.exports = {
    requireProfe,
    requireLogin
};
