import { CompanyState } from "@/components/pages/CompanyInfo";
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    name,
    logo,
    teamDetails,
    testimonials,
    projects,
    executiveSummary,
    pricing,
    userId,
  }: CompanyState = await req.json();

  try {
    const company = await db.company.create({
      data: {
        name,
        logo,
        teamDetails,
        testimonials,
        projects,
        executiveSummary,
        pricing,
        userId,
      },
    });
    return NextResponse.json({ message: company }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "Error creating company" },
      { status: 501 }
    );
  }
}
