let { user } = require("../models");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const hash = require("../lib/hash.js");

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          message: "unauthorized"
        });
      } else if (Date.now() < decoded.exp) {
        res.status(401).send({
          success: false,
          message: "time out"
        });
      } else if (req.body.userId === decoded.userId) {
        let retrievedUser = await user.findOne({
          where: { userId: req.body.userId }
        });

        if(retrievedUser.dataValues.userId === req.body.userId){
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
          res.status(401).send({
            success: false,
            message: "does not have right to update this user"
          });
        }
      } else {
        throw new Error("invalid body");
      }
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};
