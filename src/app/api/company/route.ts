import { CompanyState } from "@/components/pages/CompanyInfo";
import db from "@/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const {
    name,
    logo,
    teamDetails,
    testimonials,
    projects,
    executiveSummary,
    pricing,
    userId,
    email,
    phone,
    website,
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
        email,
        phone,
        website,
      },
    });
    return NextResponse.json({ message: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating company", error },
      { status: 501 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const {
    name,
    logo,
    teamDetails,
    testimonials,
    projects,
    executiveSummary,
    pricing,
    userId,
    email,
    phone,
    website,
  }: CompanyState = await req.json();

  try {
    const company = await db.company.update({
      where: { userId },
      data: {
        name,
        logo,
        teamDetails,
        testimonials,
        projects,
        executiveSummary,
        pricing,
        userId,
        email,
        phone,
        website,
      },
    });
    return NextResponse.json({ message: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating company", error },
      { status: 501 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  //@ts-ignore
  const userId = session?.user.userId;

  try {
    const company = await db.company.findUnique({
      where: { userId },
    });

    return NextResponse.json({ message: company }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating company", error },
      { status: 501 }
    );
  }
}
