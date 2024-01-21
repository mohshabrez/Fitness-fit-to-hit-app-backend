import { verifyToken } from "../utils.js";

const authVerify = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = verifyToken(token);
    req.user = { userId: decoded.userId };

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ errorMessage: "Unauthorised access, please add the token" });
  }
};

export default authVerify ;
