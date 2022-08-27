import { prisma } from "../../prisma/client";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  let username;
  if (!token) {
    res.status(401).json({ message: "token not provided" });
    return;
  } else {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      username = payload.username;
    } catch (error) {
      res.status(403).json({ message: "Token not valid or not provided" });
      return;
    }
  }
  const { leagueName } = req.body;

  const existingLeague = await prisma.League.findFirst({
    where: { name: leagueName },
  });
  if (existingLeague) {
    // 400 error status codes are for client errors, this is not! It's just a coincidence
    // it's common to use a 200 OK with a flag in the body (ok in this case) setted to false
    res.status(200).json({ ok: false, message: "league name already taken" });
    return;
  }

  //get admin data (I need the id as foreign key)
  const admin = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!admin) {
    res.status(400).json({ message: "invalid admin id" });
  }

  const league = await prisma.League.create({
    data: {
      name: leagueName,
      adminId: admin.id,
    },
  });
  res.status(200).json({ ok: true, message: "League created", data: league });
};

export default handler;
