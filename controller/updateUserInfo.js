let { user } = require("../models");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const hash = require("../lib/hash.js");

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new Error("decoding error");
      } else if (Date.now() < decoded.exp) {
        throw new Error('expired token');
      } else if (req.body.userId === decoded.userId) {
        let password = undefined;
        req.body.password ? password = hash(req.body.password) : null;
        await user.update({
          name: req.body.name,
          password: password,
          nickname: req.body.nickname,
          gender: req.body.gender,
          github_addr: req.body.github_addr,
          contact_email: req.body.contact_email,
          gitsu: req.body.gitsu,
          userImage: req.body.userImage,
          tech: req.body.tech,
          company: req.body.company,
          intro: req.body.intro
        }, {
          where: { userId: req.body.userId }
        });
        res.status(200).json("Success");
      } else {
        throw new Error("unauthorized");
      }
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
