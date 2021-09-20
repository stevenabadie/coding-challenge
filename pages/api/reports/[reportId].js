import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  // PUT /api/reports/:reportId
  if (req.method === "PUT") {
    const reportId = req.query.reportId;
    const body = req.body;
    const reportState = body.reportState;
    const blockState = body.blockState;

    if (reportState === "CLOSED") {
      await prisma.report.update({
        where: { id: reportId },
        data: { reportState: "CLOSED" },
      });
      res.status(200).json({ message: "This report is now closed" });
    } else if (blockState) {
      // This is where there should a request to an external API to block the post
      await prisma.report.update({
        where: { id: reportId },
        data: { blockState: true },
      });
      res.status(200).json({ message: "This report is now blocked" });
    } else {
      res.status(400).json({
        error: "This route requires a reportState or blockState value",
      });
    }
  } else {
    res.status(405).json({ error: "This route only allows PUT requests" });
  }
}
