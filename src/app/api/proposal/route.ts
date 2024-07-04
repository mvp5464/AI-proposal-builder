import { CompanyState } from "@/components/pages/CompanyInfo";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { company }: { company: CompanyState } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const generationConfig = {
    temperature: 0.3,
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });
  // and with only HTML code using tailwind css:

  const prompt = `
      Create a business proposal with detail for ${company.name} with the following details:
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

    // const bodyContentMatch = response.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    // const bodyContent = bodyContentMatch ? bodyContentMatch[1] : "";
    // let modifiedContent = bodyContent.replace(/class=/g, "className=");
    // modifiedContent = modifiedContent.replace(/<img([^>]*?)>/g, "<img$1/>");

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "Error creating company" },
      { status: 501 }
    );
  }
}
