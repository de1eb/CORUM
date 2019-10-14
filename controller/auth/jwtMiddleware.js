function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
}

module.exports = async (req, res, next) => {
  const token = req.headers["access_token"] || req.query.token;
  if (!token) return next();

  try {
    const decoded = await decodeToken(token);
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { userId, password } = decoded;
      const newToken = await generateToken({ userId, password }, "account");
      res.cookie("access_token", newToken, {
        maxAge: 1000 * 60 * 60 * 24 * 1,
        httpOnly: true
      });
    }
  } catch (e) {
    console.error(e);
  }

  return next();
};
