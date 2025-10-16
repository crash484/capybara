"use client"

import { Toaster,toast } from "react-hot-toast"


export default function Home() {



  return (
    <div className="font-sans grid min-h-screen text-black dark:text-white p-8 gap-16 sm:p-20">
      <Toaster position="top-right"/>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ul>
          
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] duration flex-wrap items-center justify-center">
        created By Shashwat Jain 🥰
      </footer>
    </div>
  );
}
