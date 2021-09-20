import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  // GET /api/reports
  if (req.method === "GET") {
    const reports = await prisma.report.findMany({
      where: { reportState: "OPEN" },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(reports);
  } else {
    res.status(405).json({ message: "This route only allows GET requests" });
  }
}
