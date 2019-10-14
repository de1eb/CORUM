// USER

module.exports = (sequelize, DataType) => {
  return sequelize.define("user", {
    // 아이디
    userId: {
      type: DataType.STRING(40),
      allowNull: false,
      primaryKey: true
    },
    // 이름
    name: {
      type: DataType.STRING(30),
      allowNull: true
    },
    // 닉네임
    nickname: {
      type: DataType.STRING(30),
      allowNull: false
    },
    // 비번
    password: {
      type: DataType.STRING,
      allowNull: false
    },
    // 성별
    gender: {
      type: DataType.STRING(10),
      allowNull: true
    },
    // 깃허브 주소
    github_addr: {
      type: DataType.STRING(40),
      allowNull: true
    },
    // 구글 주소
    contact_email: {
      type: DataType.STRING(40),
      allowNull: true
    },
    // 기수
    gitsu: {
      type: DataType.INTEGER,
      allowNull: true
    },
    // 이미지
    userImage: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: "../nori.png"
    },
    // 기술정보
    tech: {
      type: DataType.STRING(200),
      allowNull: true
    },
    // 나의 회사
    company: {
      type: DataType.STRING(20),
      allowNull: true
    },
    // 자소서
    intro: {
      type: DataType.TEXT,
      allowNull: true
    }
  });
};
