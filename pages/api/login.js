import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
  res.status(200).json({ data: existingUser });
};

export default handler;
