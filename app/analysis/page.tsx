import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import AnalysisPage from "./analysis";


export default async function Analysisgage(){
  const session = await getServerSession(authOptions);
    console.log(session)
    if(session){
      return (
        <AnalysisPage />
      );
    }
    redirect('/signup');
}