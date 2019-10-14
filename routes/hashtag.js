let express = require("express");
let {
  readAllHashtagList
} = require("../controller");

let router = express.Router();
// 전체 게시물 조회
router.get("/readAllHashtagList", (req, res) => {
  console.log("[ ROUTER ] /readAllHashtagList  ");
  readAllHashtagList(req, res);
}); // clear

module.exports = router;
