
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";

const handler = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await prisma.User.findFirst({
    where: { username: username },
  });

  if (!existingUser) {
    res.status(401).json({ message: "unhautorized" });
  }

  const passwordComparison = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!passwordComparison) {
    res.status(401).json({ message: "unhautorized" });
  }

  const jwtToken = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: "30m",
  });
  console.log(jwtToken)
  res.status(200).json({ data: existingUser, tokenData: { token: jwtToken, expiresIn: "5000" } });
};

export default handler;
