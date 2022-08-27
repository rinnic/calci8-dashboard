import { prisma } from "../../prisma/client";

const handler = async (req, res) => {
  const { leagueName, username } = req.body;

  const existingLeague = await prisma.League.findFirst({
    where: { name: leagueName },
  });
  if (existingLeague) {
    // 400 error status codes are for client errors, this is not! It's just a coincidence
    // it's common to use a 200 OK with a flag in the body (ok in this case) setted to false
    res.status(200).json({ ok: false, message: "league name already taken" });
  }

  //get admin data (I need the id as foreign key)
  const admin = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  const league = await prisma.League.create({
    data: {
      name: leagueName,
      adminId: admin.id,
    },
  });
  res.status(200).json({ ok: true, message: "League created", data: league });
};

export default handler;
