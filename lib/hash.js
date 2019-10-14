const crypto = require("crypto");

const hash = password => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

module.exports = hash;
