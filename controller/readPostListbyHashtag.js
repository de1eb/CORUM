let { user, post, hashtag } = require("../models");
module.exports = async (req, res) => {
  try {
    const tag = await hashtag.findOne({ where: { id: req.params.id } });
    const postsByHashtag = await tag.getPosts({
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
      ],
    });

    res.status(200).json(postsByHashtag);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};