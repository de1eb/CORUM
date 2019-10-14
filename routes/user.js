let express = require("express");
let { readUserInfo, updateUserInfo } = require("../controller");
let router = express.Router();

router.get("/readUserInfo", (req, res) => {
  console.log("router get /readUserInfo ");
  readUserInfo(req, res);
});

router.patch("/updateUserInfo", (req, res) => {
  console.log("router patch /updateUserInfo ");
  updateUserInfo(req, res);
})

module.exports = router;
