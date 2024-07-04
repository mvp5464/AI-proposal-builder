import db from "@/db";

export async function getCompanyDetail({ userId }: { userId: string }) {
  try {
    const companyInfo = await db.company.findUnique({
      where: { userId: userId },
    });
    return companyInfo;
  } catch (e) {
    console.log({ e });
    return null;
  }
}
