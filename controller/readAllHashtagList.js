let { posthashtag, hashtag } = require("../models");

module.exports = async (req, res) => {
  try {
    let retrievedHashtag = await hashtag.findAll({
      limit: 100,
      order: [
        ['count', 'DESC'],
        ['name', 'ASC'],
      ]
    });
    res.status(200).json(retrievedHashtag);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};