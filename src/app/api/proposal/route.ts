import { CompanyState } from "@/components/pages/CompanyInfo";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { company }: { company: CompanyState } = await req.json();
  console.log("0");
  console.log(company.name);
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  console.log({ apiKey: process.env.GEMINI_API_KEY || "" });
  console.log("1");
  const generationConfig = {
    temperature: 0.3,
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });
  console.log("2");
  //   and elaborate on it with code only HTML body tag with tailwind css:

  const prompt = `
      Create a business proposal for ${company.name} with the following details:
      - Logo: ${company.logo}
      - Team Details: ${company.teamDetails}
      - Testimonials: ${company.testimonials}
      - Previous Projects: ${company.projects}
      - Executive Summary: ${company.executiveSummary}
      - Pricing: ${company.pricing}
      `;
  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    console.log({ result });
    console.log({ response });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "Error creating company" },
      { status: 501 }
    );
  }
}
