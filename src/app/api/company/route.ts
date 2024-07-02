import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {
    name,
    logo,
    teamDetails,
    testimonials,
    projects,
    executiveSummary,
    pricing,
  } = await req.json();
  console.log({
    name,
    logo,
    teamDetails,
    testimonials,
    projects,
    executiveSummary,
    pricing,
  });
  try {
    const company = await prisma.company.create({
      data: {
        name,
        logo,
        teamDetails,
        testimonials,
        projects,
        executiveSummary,
        pricing,
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
