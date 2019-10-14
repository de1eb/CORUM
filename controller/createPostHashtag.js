let { post, hashtag } = require("../models");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new Error("decoding error");
      } else if (Date.now() < decoded.exp) {
        throw new Error('expired token');
      } else if (req.body.userId === decoded.userId) {
        let last_inserted_post = await post.create({
          userId: req.body.userId,
          title: req.body.title,
          subTitle: req.body.subTitle,
          contents: req.body.contents,
          category: req.body.category,
          hashtag: req.body.hashtag
        });

        let add_hashtag = async function (element) {
          try {
            let hashtag_found = await hashtag.findOne({ where: { name: element } });
            if (hashtag_found) {
              await hashtag.update({
                count: hashtag_found.dataValues.count + 1
              }, {
                where: { name: element }
              });

              hashtag_found.addPosts(last_inserted_post.dataValues.id);
            } else {
              let hashtag_created = await hashtag.create({ name: element });
              hashtag_created.addPosts(last_inserted_post.dataValues.id)
            }
          } catch (err) {
            console.log(err.message);
            throw new Error("function error")
          }
        };

        if (Array.isArray(req.body.hashtag)) {
          await Promise.all(
            req.body.hashtag.map(
              el =>
                new Promise((resolve, reject) => {
                  resolve();
                  return add_hashtag(el);
                })
            ))
            .then(result => res.status(200).send("Success"))
            .catch(err => { throw new Error(err.message) });
        } else {
          res.status(200).send("Success");
        }
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};