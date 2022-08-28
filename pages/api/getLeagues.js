import authenticate from "../../lib/middleware";
import { prisma } from "../../prisma/client";

const handler = async (req, res) => {
  const leagueAdmin = await prisma.User.findFirst({
    where: { username: req.username },
  });

  const leagues = await prisma.league.findMany({
    where: { adminId: leagueAdmin.id },
  });

  return res.status(200).json({ data: leagues });
};

export default authenticate(handler);
