"use client"

import { Toaster,toast } from "react-hot-toast"



export default function Home() {



  return (
    <div className="font-sans grid min-h-screen text-black dark:text-white p-8 gap-16 sm:p-20">
      <Toaster position="top-right"/>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <ol>
          <li>
            ok right so i implemented all the basic features u asked for except for the mobile compatibility
            <br/> the problem is i was travelling for 3 days so i didnt have much time 
          </li>
          <li>
            i wasted alot of time could have done this better but i didnt hvae much time to plan this out
            <br />like implementing global store and not using it, not usig toast 
          </li>
          <li>
            due to diwali prep and all this is the best product i can produce as of now
          </li>

        </ol>
      </main>
      <footer className="row-start-3 flex gap-[24px] duration flex-wrap items-center justify-center">
        created By Shashwat Jain 🥰
      </footer>
    </div>
  );
}
