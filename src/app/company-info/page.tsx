import CompanyInfo from "@/components/pages/CompanyInfo";
import { getCompanyDetail } from "@/db/companyInfo";
import { authOptions, session } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CompanyPage() {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user.userId;

  if (!session || !userId) {
    redirect("/");
  }
  const companyInfo = await getCompanyDetail({ userId });
  if (!(companyInfo === null || !companyInfo)) {
    redirect("/generate-proposal");
  }

  return <CompanyInfo userId={userId} />;
}
