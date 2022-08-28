import jwt from "jsonwebtoken";

export const authenticate = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not provided" });
    } else {
      try {
        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.username = payload.username;
        return handler(req, res);
      } catch (error) {
        return res
          .status(403)
          .json({ message: "Token not valid or not provided" });
      }
    }
  };
};

export default authenticate;
