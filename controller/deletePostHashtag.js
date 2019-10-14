const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
let { hashtag, post } = require("../models");

module.exports = async (req, res) => {
  try {
    const token = req.body.access_token;
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        throw new Error("decoding error");
      } else if (Date.now() < decoded.exp) {
        throw new Error('expired token');
      } else if (req.body.userId === decoded.userId) {
        let retrievedPost = await post.findOne({
          attributes: ["userId"],
          where: { id: req.params.id }
        });

        if (retrievedPost.dataValues.userId === req.body.userId) {
          await post.destroy({
            where: { id: req.params.id }
          });

          async function check_hashtag_array(element) {
            let hashtag_to_be_modified = await hashtag.findOne({
              where: { name: element }
            });

            if (hashtag_to_be_modified) {
              if (hashtag_to_be_modified.dataValues.count > 1) {
                hashtag.update({
                  count: hashtag_to_be_modified.dataValues.count - 1
                }, {
                  where: { name: element }
                })
              } else if (hashtag_to_be_modified.dataValues.count === 1) {
                hashtag.destroy({
                  where: { name: element }
                })
              }
            }
          }

          if (Array.isArray(req.body.hashtag)) {
            await Promise.all(
              req.body.hashtag.map(
                el =>
                  new Promise((resolve, reject) => {
                    resolve();
                    return check_hashtag_array(el);
                  })
              )
            ).then(result => res.status(200).send("Deleted"))
              .catch(err => { throw new Error(err.message) });
          } else {
            res.status(200).send("Deleted");
          }


        } else {
          throw new Error("unauthorized");
        }
      }
    }); // verify end
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  };
}
// 이하의 백업 기능은 시간상 추후 구현
// 지우는 날짜만 추가됨
// 주기적으로 delete_at 날짜와 현재 날짜의 차이가 일정량 이상인
// 데이터들을 자동으로 지우는 알고리즘 필요
