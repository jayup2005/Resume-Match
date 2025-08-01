import { Upload, LineChart, Lightbulb } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Body() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center mt-32 mb-12 px-4">
        <div className="mb-6">
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            Optimize Your Resume for
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-gray-500">
            Any Job Description
          </p>
        </div>

        <div className="mb-6 text-gray-600 max-w-xl">
          <p>
            Get instant analysis of how well your resume matches job requirements.
            Receive personalized suggestions to improve your chances of landing interviews.
          </p>
        </div>

        <div>
          <button className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800 cursor-pointer" onClick={() => signIn()}>
            Analyze Resume Now
          </button>
        </div>
      </div>

      <div className="bg-gray-100 mt-16 pb-10 px-4">
        <div className="flex flex-col justify-center items-center text-center pt-8 mb-6">
          <p className="text-2xl font-bold pb-2">How It Works</p>
          <p className="text-gray-900">
            Simple 3-step process to optimize your resume
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-y-10 gap-x-6 mt-12 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center text-center px-4 md:px-2 w-full md:w-1/3">
            <div className="text-white bg-black rounded-full p-4 mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg mb-2">Upload Documents</p>
            <p className="text-gray-900 text-base max-w-sm">
              Upload your resume and paste the job description you're targeting.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center px-4 md:px-2 w-full md:w-1/3">
            <div className="text-white bg-black rounded-full p-4 mb-4">
              <LineChart className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg mb-2">AI Analysis</p>
            <p className="text-gray-900 text-base max-w-sm">
              Our AI analyzes keywords, skills, and requirements to calculate match percentage.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center px-4 md:px-2 w-full md:w-1/3">
            <div className="text-white bg-black rounded-full p-4 mb-4">
              <Lightbulb className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg mb-2">Get Suggestions</p>
            <p className="text-gray-900 text-base max-w-sm">
              Receive detailed recommendations to improve your resume's match score.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
