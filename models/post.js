module.exports = (sequelize, DataType) => {
  return sequelize.define("post", {
    title: {
      type: DataType.TEXT,
      allowNull: false
    },
    subTitle: {
      type: DataType.TEXT,
      allowNull: false
    },
    contents: {
      type: DataType.TEXT,
      allowNull: false
    },
    category: {
      type: DataType.STRING(30),
      allowNull: false
    },
    visit_count: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    like_count: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, { timestamps: true, underscored: true });
};
