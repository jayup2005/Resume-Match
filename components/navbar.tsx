import { signIn } from "next-auth/react";
export default function Navbar(){
    return <div className="flex justify-between p-3 mb-16">
        <div>
            <p className="text-3xl font-bold text-gray-900">Resume Match</p>
        </div>
        <div className="flex pt-1"> 
            <p className="px-3 text-lg text-gray-500 hover:text-black cursor-pointer">How It works</p>
            <p className="px-3 text-lg text-gray-500  hover:text-black cursor-pointer">Features</p>
            <p className="px-3 text-lg text-gray-500  hover:text-black cursor-pointer">Pricing</p>
        </div>
        <div>
            <button className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800 cursor-pointer" onClick={() => signIn()}>Get Started</button>
        </div>
    </div>
}