import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 mb-12 gap-y-4 md:gap-y-0">
      <div>
        <p className="text-2xl md:text-3xl font-bold text-gray-900">Resume Match</p>
      </div>
      
      {/* Hide this section on small screens */}
      <div className="hidden md:flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <p className="text-lg text-gray-500 hover:text-black cursor-pointer">How It works</p>
        <p className="text-lg text-gray-500 hover:text-black cursor-pointer">Features</p>
        <p className="text-lg text-gray-500 hover:text-black cursor-pointer">Pricing</p>
      </div>

      <div>
        <button
          className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800 cursor-pointer"
          onClick={() => signIn()}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
