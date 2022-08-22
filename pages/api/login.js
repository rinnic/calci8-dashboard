import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const { username, password } = req.body;
  const prisma = new PrismaClient();

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
  res.status(200).json({ data: existingUser, tokenData: { token: jwtToken, expiresIn: "5000" } });
};

export default handler;
