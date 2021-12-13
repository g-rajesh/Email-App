const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated!");
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "myConnectWebsiteSecretCode");
  } catch (err) {
    if (err.message === "jwt expired") {
      const tokenExpiredError = new Error("Token Expired");
      tokenExpiredError.status = 401;
      tokenExpiredError.data = {
        error: "JWT token Expired",
      };
      throw tokenExpiredError;
    }
    console.log(err.status, err.message);
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated!");
    error.status = 401;
    throw error;
  }

  req.email = decodedToken.email;

  next();
};
