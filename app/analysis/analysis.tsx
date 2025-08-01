"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Analysis = {
  name:string
  match_percentage: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string[];
  overall_feedback: string;
};

export default function AnalysisPage() {
  const [data, setData] = useState<Analysis | null>(null);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem("analysis");

    if (!raw) return router.push("/analyze");

    try {
      const parsed = JSON.parse(raw);
      setData({
        name:parsed.name_of_person ?? '',
        match_percentage: parsed.match_percentage ?? 0,
        matched_keywords: parsed.matched_keywords ?? [],
        missing_keywords: parsed.missing_keywords ?? [],
        suggestions: parsed.suggestions ?? [],
        overall_feedback: parsed.overall_feedback ?? "No feedback available.",
      });
      
      setTimeout(() => setAnimate(true), 100);
    } catch {
      console.error("Invalid analysis data");
      router.push("/analyze");
    }
  }, [router]);

  if (!data) return <div className="text-center py-10">Loading analysis...</div>;

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - data.match_percentage / 100);
  console.log(data)
  return (
    <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center px-4">
      <div
        className={`max-w-4xl w-full bg-white shadow-md rounded-xl p-8 transition-all duration-700 ease-out ${
          animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">🔍 Jay Patel — Resume Match Analysis</h2>
          <p className="text-gray-500 text-sm text-center">Personalized insights based on your uploaded resume and job description</p>
        </header>

        <section className="flex flex-col md:flex-row gap-8">
    
          <div className="flex flex-col items-center md:w-1/3">
            <div className="relative w-24 h-24 mb-2">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  cx="18"
                  cy="18"
                  r={radius}
                  className="text-gray-200"
                />
                <circle
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  cx="18"
                  cy="18"
                  r={radius}
                  className="text-black transition-all duration-1000"
                  strokeDasharray={circumference}
                  strokeDashoffset={animate ? offset : circumference}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-semibold text-black">
                {data.match_percentage}%
              </div>
            </div>
            <p className="text-sm text-gray-800 font-medium">Match Score</p>
            <p className="text-xs text-gray-500 text-center">
              Resume matches {data.match_percentage}% of job requirements
            </p>
          </div>


          <div className="md:w-2/3">
            <h3 className="font-semibold text-gray-800 mb-2">Key Recommendations</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.suggestions.map((s, i) => (
                <li key={i}>➕ {s}</li>
              ))}
            </ul>
          </div>
        </section>

        
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm my-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {data.missing_keywords.map((kw, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-md">{kw}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Matched Keywords</h4>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {data.matched_keywords.map((kw, i) => (
                <span key={i} className="bg-green-100 px-2 py-1 rounded-md">{kw}</span>
              ))}
            </div>
          </div>
        </section>


        <footer>
          <h4 className="font-medium text-gray-800 mb-2">Overall Feedback</h4>
          <p className="text-sm text-gray-700">{data.overall_feedback}</p>
        </footer>
      </div>
    </div>
  );
}
