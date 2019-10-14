// 설치 ( 처음 시작시 스키마 가 없을수 있음 , 커멘드창에 sequelize db:create 하면만들어짐 )
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// 참조 실행
const { post, user, hashtag, auth } = require("./routes");
const { sequelize } = require("./models");
const { jwtMiddleware } = require("./controller/auth");

// 메인 실행
const app = express();
sequelize.sync(); // 스키마에 테이블 생성

app.set("port", process.env.PORT || 3000);

// TODO: middleware
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtMiddleware);

// TODO: secret jwt
app.set("jwt-secret", process.env.SECRET_KEY);

// TODO: route
app.get("/", (req, res) => {
  res.send("CORUM PROJECT START");
});

app.use(hashtag);
app.use(post);
app.use(user);
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")} 번 포트에서 서버 실행중입니다.`);
});
