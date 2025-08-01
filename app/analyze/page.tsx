import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Upload } from "./analyze-client";


export default async function AnalyzePage() {
  const session = await getServerSession(authOptions);
  console.log(session)
  if(session){
    return (
      <Upload />
    );
  }
  redirect('/signup');

}
