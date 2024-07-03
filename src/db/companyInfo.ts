// import db from "@/db";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export async function getCompanyDetail({ userId }: { userId: string }) {
  try {
    const companyInfo = await db.company.findMany({
      where: { id: userId },
    });
    return companyInfo;
  } catch (e) {
    return null;
  }
}
