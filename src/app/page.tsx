"use client"
import Image from "next/image";
import { useEffect } from "react";
import { Toaster,toast } from "react-hot-toast"

export default function Home() {
  useEffect(()=>{
    toast.success("toast works");
  },[])
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Toaster position="top-right"/>
      <header className="flex justify-between">
        this is header
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        THis is main
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        this is the footer
      </footer>
    </div>
  );
}
