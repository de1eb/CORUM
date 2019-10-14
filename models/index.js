const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development"; // 개발단계일때 / 배포때는 production
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
); // config에 내용 가져옴

const db = {};

db.Sequelize = Sequelize; // 패키지
db.sequelize = sequelize; // 인스턴스, sequelize를 모듈화 해서 사용할것
db.post = require("./post")(sequelize, Sequelize);
db.user = require("./user")(sequelize, Sequelize);
db.hashtag = require("./hashtag")(sequelize, Sequelize);
db.posthashtag = require("./posthashtag")(sequelize, Sequelize);

/*
1 대 1 (hasOne, belongsTo)
1 대 다(hasMany, belongsTo)
다 대 다 (belongsToMany)
*/
db.user.hasMany(db.post, {
  foreignKey: "userId"
  // souceKey: "id"
});

db.post.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "userId"
});

db.post.belongsToMany(db.hashtag, { through: db.posthashtag });
db.hashtag.belongsToMany(db.post, { through: db.posthashtag });
//posthashtag 테이블의 hashtag_name 컬럼의 on update cascade 옵션을 제거해야되는데
// 옵션 조작방법 파악에 실패하여 시간상 직접 posthashtag 모델을 형성하기로 결정

// db.post.hasMany(db.posthashtag, {
//   foreignKey: 'post_id'
// });

// db.posthashtag.belongsTo(db.post, {
//   foreignKey:'post_id',
//   targetKey: 'id'
// });

module.exports = db;
