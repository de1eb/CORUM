module.exports = async (req, res) => {
  res.json({
    success: true,
    info: req.body
  });
};
