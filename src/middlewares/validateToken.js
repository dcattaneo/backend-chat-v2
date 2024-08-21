import jwt from "jsonwebtoken";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = await req.cookies;
    if (!token)
      return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      //   destructuring the jwt id, which is the same id as the MongoDB user id
      const { id } = decoded;
      // console.log(id);
      return (req.userId = id);
    });
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
