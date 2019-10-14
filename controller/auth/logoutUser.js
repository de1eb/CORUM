module.exports = async (req, res) => {
  res.cookie("access_token", null, {
    maxAge: 0,
    httpOnly: true
  });
  res.sendStatus(204);
};
