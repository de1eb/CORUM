let { user } = require("../../models/index");
const { generateToken } = require("../../lib/token");
const hash = require("../../lib/hash");

module.exports = async (req, res) => {
  try {
    let { userId, password } = req.body;
    password = hash(password);
    const payload = {
      userId
      // exp: Math.floor(Date.now() / 1000 + 60 * 15) // 15분 만료시간 주기
    };
    const check = value => {
      if (!value) {
        // user does not exist
        throw new Error("login failed");
      } else {
        // user exists, check the password
        if (value.dataValues.password === password) {
          // create a promise that generates jwt asynchronously
          let token = generateToken(payload);
          // res.cookie("access_token", token, {
          //   httpOnly: true,
          //   maxAge: 1000 * 60 * 60 * 24 * 1
          // });  로컬 스토리지에 토큰 저장하는 방식으로 운영 중. 추후 쿠키 이용시 재활성 필요
          return token;
        } else {
          throw new Error("login failed");
        }
      }
    };

    const respond = access_token => {
      res.json({
        message: "LOGIN SUCCESS",
        userId,
        access_token
      });
    };

    const onError = error => {
      console.log(error.message);
      // res.status(403).json({
      //   message: error.message
      // });
      res.status(403).send("authentication error");
    };

    // TODO: find by username
    const findByUsername = async userId => {
      return await user.findOne({ where: { userId } });
    };

    // TODO: 실행
    findByUsername(userId)
      .then(check)
      .then(respond)
      .catch(onError);
  } catch (e) {
    console.error(e);
    res.status(500).send("500 ERROR");
  }
};
