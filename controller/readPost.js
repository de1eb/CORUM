let { user, post, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    let retrievedPost = await post.findOne({
      attributes: ["contents", "category", "id", "visit_count"],
      where: { id: req.params.id },
      include: { model: hashtag, required: false, attributes: ["name"]}
    });

    let vcount = retrievedPost.dataValues.visit_count + 1;
    await post.update({ visit_count: vcount }, { where: { id: req.params.id } });
    delete retrievedPost.dataValues.visit_count;
    res.status(200).json(retrievedPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server Error");
  }
};