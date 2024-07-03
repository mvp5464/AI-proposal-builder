import CompanyInfo from "@/components/pages/CompanyInfo";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BountyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <CompanyInfo />;
}
