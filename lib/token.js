const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "1d" // 시간 축소 필요. 대폭 축소하고 refresh token과 함께 운영
  });
}

exports.generateToken = generateToken;
