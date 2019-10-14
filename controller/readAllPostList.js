let { user, post } = require("../models");
const Sequelize = require("sequelize");
module.exports = async (req, res) => {
  try {
    let allPosts = await post.findAll({
      attributes: [
        "id",
        "title",
        "subTitle",
        "createdAt",
        "updatedAt",
        "visit_count",
        "like_count"
      ],
      include: [
        { model: user, required: false, attributes: ["nickname", "userImage"] }
      ]
    });
    res.status(200).json(allPosts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
