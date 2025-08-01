"use client";
import {SessionProvider} from 'next-auth/react'
import Body from "@/components/body";
import Navbar from "@/components/navbar";

export default function Home() {
  return <SessionProvider>
    <Navbar />
    <Body />
  </SessionProvider>
  
}
