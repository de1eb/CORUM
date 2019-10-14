let { user } = require("../models");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new Error('decoding error');
      } else if (Date.now() < decoded.exp) {
        throw new Error('expired token');
      } else if (req.body.userId === decoded.userId) {
        let retrievedUser = await user.findOne({
          where: { userId: req.body.userId }
        });

        if (retrievedUser.dataValues.userId === req.body.userId) {
          let result = await user.findOne({
            attributes: [
              "userId",
              "name",
              "nickname",
              "gender",
              "github_addr",
              "contact_email",
              "gitsu",
              "userImage",
              "tech",
              "company",
              "intro"
            ],
            where: {
              userId: req.body.userId
            }
          });
          res.status(200).json(result);
        } else {
          throw new Error("does not have right to read this user");
        }
      } else {
        throw new Error("unauthorized");
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
