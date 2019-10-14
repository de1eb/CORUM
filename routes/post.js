let express = require("express");
let {
  readAllPostList,
  readPostListbyCategory,
  readPostListbyHashtag,
  readPost,
  createPostHashtag,
  updatePostHashtag,
  deletePostHashtag
} = require("../controller");

let router = express.Router();
// 전체 게시물 조회
router.get("/readAllPostList", (req, res) => {
  console.log("[ ROUTER ] /readAllPosts  ");
  readAllPostList(req, res);
}); // clear

router.get("/readPostListbyCategory/:category", (req, res)=>{
  console.log("[ ROUTER ] /readPostListbyCategory/:category  ");
  readPostListbyCategory(req, res);
});  //clear

router.get("/readPostListbyHashtag/:id", (req, res)=>{
  console.log("[ ROUTER ] /readPostListbyHashtag/:id  ");
  readPostListbyHashtag(req, res);
});

router.get("/readPost/:id", (req, res) => {
  console.log("[ ROUTER ] /readPost/:id  ");
  readPost(req, res);
});  //clear

router.post("/createPostHashtag", (req, res) => {
  console.log("[ ROUTER ] /createPostHashtag  ");
  createPostHashtag(req, res);
}); // clear

router.patch("/updatePostHashtag/:id", (req, res) => {
  console.log("[ ROUTER ] /updatePostHashtag/:id  ");
  updatePostHashtag(req, res);
}); // clarifyArray 를 통해 추가해야되는 해시태그와 삭제해야되는 해시태그를 posthashtag table에서 제거, 생성

router.delete("/deletePostHashtag/:id", (req, res) => {
  console.log("[ ROUTER ] /deletePostHashtag/:id  ");
  deletePostHashtag(req, res);
}); // clear

module.exports = router;
