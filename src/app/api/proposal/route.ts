import { CompanyState } from "@/components/pages/CompanyInfo";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const { company }: { company: CompanyState } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const generationConfig = {
    temperature: 0.3,
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });
  // - Testimonials: ${company.testimonials}
  // - Previous Projects: ${company.projects}

  const prompt = `
      Create a Executive summary in around 60 words for ${company.name} with the following details:
      - Team Details: ${company.teamDetails}
      - Executive Summary: ${company.executiveSummary}
      - Pricing: ${company.pricing}
      `;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating company", error },
      { status: 501 }
    );
  }
}
