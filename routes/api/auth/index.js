const router = require("express").Router();
const { createUser } = require("../../../controller/auth");
const { loginUser } = require("../../../controller/auth");
const { logoutUser } = require("../../../controller/auth");
const { checkUser } = require("../../../controller/auth");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/check", checkUser);
router.post("/logout", logoutUser);

module.exports = router;
