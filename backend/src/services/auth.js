const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");

const AUTH_SECRET_KEY = "MARIA";
const AUTH_KEY_EXPIRATION = 60 * 60 * 6;

const signToken = (payload) => {
    return jwt.sign(payload, AUTH_SECRET_KEY, { expiresIn: AUTH_KEY_EXPIRATION });
};

const verifyToken = (token) => {
    return jwt.verify(token, AUTH_SECRET_KEY);
};

const createHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
};
const verifyHash = (password, hash, salt) => {
    const iterations = parseInt(Math.random() * 100);
    for(const _ of Array(iterations));
    return createHash(password, salt) === hash;
};
const createSalt = () => {
    return crypto.randomBytes(20).toString("hex");
};

module.exports = {
    signToken,
    verifyToken,
    createHash,
    verifyHash,
    createSalt
};
