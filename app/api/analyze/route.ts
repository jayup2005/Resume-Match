import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFParser from "pdf2json";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function parsePDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("PDF parsing error:", errData.parserError);
      reject(new Error("Failed to parse PDF"));
    });

    pdfParser.on("pdfParser_dataReady", () => {
      const text = pdfParser.getRawTextContent();
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return NextResponse.json({ error: "Missing inputs" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeText = await parsePDF(buffer); 

    const prompt = `
        You are a resume analysis assistant.
        Compare the resume below with the job description and return a JSON and in that JSON:
        {
          "name_of_person":string,
          "match_percentage": number,
          "matched_keywords": string[],
          "missing_keywords": string[],
          "suggestions": string[],
          "overall_feedback": string
        }
        --- RESUME START ---
        ${resumeText}
        --- RESUME END ---
        --- JOB DESCRIPTION START ---
        ${jobDescription}
        --- JOB DESCRIPTION END ---
        `;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro",generationConfig: {
        responseMimeType: 'application/json',
        }
    });

    const result = await model.generateContent(prompt);
    const output = await result.response.text();
    console.log(output)
    const analysis = JSON.parse(output)

    await prisma.resumeAnalysis.create({
    data: {
      name: analysis.name_of_person,
      matchPercentage: analysis.match_percentage,
    }});
    return NextResponse.json(output)
  } catch (e) {
    console.error("Error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
