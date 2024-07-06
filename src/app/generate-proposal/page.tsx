import GenerateProposal from "@/components/pages/GenerateProposal";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getCompanyDetail } from "@/db/companyInfo";
import { redirect } from "next/navigation";

export default async function GenerateProposalPage() {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user.userId;

  if (!session) {
    redirect("/");
  }

  const companyInfo = await getCompanyDetail({ userId });
  if (!companyInfo) {
    redirect("/company-info");
  }

  return <GenerateProposal companyInfo={companyInfo} userId={userId} />;
}
