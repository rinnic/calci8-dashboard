import bcrypt from "bcrypt";
import { prisma } from "../../prisma/client";

const handler = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  const existingUser = await prisma.User.findFirst({
    where: { username: username },
  });
  if (existingUser) {
    // 400 error status codes are for client errors, this is not! It's just a coincidence
    // it's common to use a 200 OK with a flag in the body (ok in this case) setted to false
    res.status(200).json({ ok: false, message: "username already registered" });
  }
  const salt = await bcrypt.genSalt(10);
  const encodedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.User.create({
    data: {
      ...req.body,
      password: encodedPassword,
    },
  });
  res.status(200).json({ ok: true, message: "User created", data: user });
};

export default handler;
