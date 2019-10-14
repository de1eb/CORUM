module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "posthashtag",
    {
      // hashtag_name: {
      //   type: DataType.STRING(30),
      //   onDelete: "CASCADE",
      //   onUpdate: null
      // }
    },
    { timestamps: true, underscored: true }
  );
};

// post_id: {
//   type: DataType.INTEGER(11),
//   allowNull: false,
//   primaryKey: true,
//   // references: {
//   //   model: 'posts',
//   //   key: 'id',
//   // },
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
//   allowNull: false
// },

// hashtag_name: {
//   type: DataType.STRING(30),
//   allowNull: false,
//   primaryKey: true,
//   // references: {
//   //   model: 'hashtags',
//   //   key: 'name',
//   // },
//   onDelete: 'CASCADE',
//   allowNull: false
// },
