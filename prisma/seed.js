const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const data = require('../data/reports')

async function main(data) {
  // This doesn't currently output errors from individual loops in the data creation. It may be
  // worth adding if there is a need for a larger import of data.
  Promise.all(data.elements.map(async(report) => {
    await prisma.report.create({
      data: {
        id: report.id,
        reportType: report.payload.reportType,
        reportState: report.state,
        message: report.payload.message,
        createdAt: report.created
      }
    })
  }))
}

main(data)
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })