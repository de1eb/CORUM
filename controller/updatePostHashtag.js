let { user, post, hashtag } = require("../models");
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
        let retrievedPost = await post.findOne({
          attributes: ["userId"],
          where: { id: req.params.id }
        });

        if (retrievedPost.dataValues.userId === req.body.userId) {
          await post.update({
            title: req.body.title,
            subTitle: req.body.subTitle,
            contents: req.body.contents,
            category: req.body.category
          }, {
            where: { id: req.params.id }
          });

          let old_posthashtag = await posthashtag.findAll({
            where: { post_id: req.body.params }
          })

          // req.body.hashtag   결과로 되어야하는 해시태그의 '이름' 배열['개', '새', '호랑이']

          // old_posthashtag.dataValues  기존의 해시태그 아이디들이 들어있는 배열[{ post_id: 1, hashtag_id: 1 }, { post_id: 1, hashtag_id: 2 }, { post_id: 1, hashtag_id: 3 }]
          // { post_id: 1, hashtag_id: 3 } 을 제거하고 { post_id: 1, hashtag_id: 4 } 를 추가해야함

          // old_posthashtag
          async function change_hashtag(hashtag_id) {
            let hashtag_found = await hashtag.findOne({
              where: { id: hashtag_id }
            })
            if (hashtag_found) { // 당연히 있음
              if (hashtag_found.dataValues.count > 1) {
                hashtag.update({
                  count: hashtag_found.dataValues.count - 1
                }, {
                  where: { id: hashtag_id }
                })
              } else if (hashtag_found.dataValues.count === 1) {
                hashtag.destroy({
                  where: { id: hashtag_id }
                })
              }

            }
          }

          if (Array.isArray(old_posthashtag.dataValues)) {
            await Promise.all(
              old_posthashtag.dataValues.map(
                el =>
                  new Promise((resolve, reject) => {
                    resolve();
                    return change_hashtag(el.hashtag_id);
                  })
              )
            ).then(result => res.status(200).send("Deleted"))
              .catch(err => { throw new Error(err.message) });
          } else {
            res.status(200).send("Deleted");
          }

          function clarifyArray(arr1, arr2) {
            let result = { deleted: [], created: [] };
            // deleted 배열은 제거된 해시태그 모음, created는 추가된 해시태그 모음
            for (let el of arr1) {
              if (!arr2.includes(el)) {
                result.deleted.push(el);
              }
            }

            for (let el of arr2) {
              if (!arr1.includes(el)) {
                result.created.push(el);
              }
            }
            return result;
          }  // 업데이트 된 글에서 제거된 해시태그와 추가된 해시태그를 구분



          // async (req, res, next) => {
          //   const tag = await Hashtag.find({ where: { title: '노드' } });
          //   const posts = await tag.getPosts();
          // };

          // posthashtag
          // params.id 1['개', '새', '고양이']가
          // 1, 개
          // 1, 새
          // 1, 고양이


          // 1, 고양이 제거, hashtag 고양이 count 1 낮추거나 아예 삭제
          // 1, 호랑이 추가, hashtag 고양이 count 1 높이거나 새로 생성
          // ['개', '새', '호랑이']


          res.status(200).send("Updated");

        } else {
          throw new Error("does not have right to modify this post")
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

// hashtag 갱신 작업필요
