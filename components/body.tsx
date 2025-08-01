
import { Upload, LineChart, Lightbulb } from 'lucide-react';
export default function Body(){
    return <div>
        <div className="flex flex-col items-center justify-center text-center mt-32 mb-12">
            <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">Optimize Your Resume for</p>
                <p className="text-4xl font-bold text-gray-500">Any Job Description</p>
            </div>

            <div className="mb-6 text-gray-600 max-w-xl">
                <p>Get instant analysis of how well your resume matches job requirements. Receive personalized suggestions to 
                improve your chances of landing interviews.</p>
            </div>

            <div>
                <button className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800 cursor-pointer">Analyze Resume Now</button>
            </div>
        </div>

        <div className="bg-gray-100 mt-16 pb-10">
            <div className="flex flex-col justify-center items-center text-center pt-4 mb-3">
                <p className="text-2xl font-bold pb-2">How It Works</p>
                <p className="text-gray-900">Simple 3-step process to optimize your resume</p>
            </div>

            <div className="flex justify-between mt-16">
                <div className="flex flex-col justify-center items-center pl-4">
                    <div className='text-white bg-black rounded-4xl p-3'>
                        <Upload />
                    </div>
                    <p className='font-bold text-lg'>Upload Documents</p>
                    <p className='text-gray-900 text-base max-w-96 text-center'>Upload your resume and paste the job description you're targeting</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className='text-white bg-black rounded-4xl p-3'>
                        <LineChart />
                    </div>
                    <p className='font-bold text-lg'>AI Analysis</p>
                    <p className='text-gray-900 text-base max-w-96 text-center'>Our AI analyzes keywords, skills, and requirements to calculate match percentage</p>
                </div>
                <div className="flex flex-col justify-center items-center pr-4">
                    <div className='text-white bg-black rounded-4xl p-3'>
                        <Lightbulb />
                    </div>
                    <p className='font-bold text-lg'>Get Suggestions</p>
                    <p className='text-gray-900 text-base max-w-96 text-center'>Receive detailed recommendations to improve your resume's match score</p>
                </div>
            </div>
        </div>
    </div>
}