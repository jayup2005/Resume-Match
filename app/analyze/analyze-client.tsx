"use client";

import { FileText, BriefcaseBusiness } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export function Upload() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert("Please upload your resume and enter job description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      localStorage.setItem("analysis", result);
      router.push("/analysis");
    } catch (error) {
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-black font-semibold animate-pulse">⏳</span>
          </div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
          Analyzing your resume and job description...
        </p>
        <p className="mt-2 text-sm text-gray-500 text-center px-4">
          Matching skills, experience, and keywords
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      <div className="mb-10">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">Analyze Your Resume</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-500 pt-4">
          Upload your resume and job description to get started
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-center gap-8 w-full max-w-5xl">
        <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full">
          <div className="text-gray-500 mb-2">
            <FileText size={32} />
          </div>
          <p className="font-semibold text-lg mb-1">Upload Resume</p>
          <p className="text-gray-500 text-sm mb-4">Drag and drop your resume (PDF)</p>
          <label className="cursor-pointer bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            {uploadStatus ? "File Uploaded" : "Choose File"}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setResumeFile(file);
                  setUploadStatus(true);
                }
              }}
            />
          </label>
        </div>

        <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full">
          <div className="text-gray-500 mb-2">
            <BriefcaseBusiness size={32} />
          </div>
          <p className="font-semibold text-lg mb-4">Job Description</p>
          <textarea
            placeholder="Paste the job description here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none placeholder-gray-400"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 mt-4 w-full"
            onClick={handleAnalyze}
          >
            Analyze Now
          </button>
        </div>
      </div>
    </div>
  );
}
