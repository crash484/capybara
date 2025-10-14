"use client"
import Image from "next/image";
import {Moon,Sun} from "lucide-react"
import {useTheme } from "next-themes"
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Toaster,toast } from "react-hot-toast"
import { trpc } from "../lib/utils/trpc";

export default function Home() {
  const {theme,setTheme} = useTheme()

  {/*gonna add the frontend here only rn */}
  const {data: categories, isLoading,error} = trpc.category.getAll.useQuery();

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p> error in loading categories</p>
  {/* move this all frontend code into a card so it looks better */}
  return (
    <div className="font-sans grid min-h-screen p-8 gap-16 sm:p-20">
      <Toaster position="top-right"/>
      <div className="top sticky flex justify-between">
        <div className="text-xl p-3 hover:bg-violet-100 dark:hover:bg-gray-800 duration-340 ease-in-out h-fit w-fit rounded-lg">
        heyyyyyyyyyyy!
        </div>
        <div className="rounded-lg text-xl p-3 hover:bg-violet-100 dark:hover:bg-gray-800 duration-340 ease-in-out h-fit">
          features
        </div>
        <div>
          <Button variant="outline" size="icon" onClick={()=>setTheme(theme==='light'?'dark':'light')}>
            {theme==='light'?<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>:
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        </div>

      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Categories</h1>
      <ul className="space-y-2">
        {categories?.map((cat) => (
          <li key={cat.id} className="p-2 bg-gray-100 rounded-md">
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] duration flex-wrap items-center justify-center">
        created By Shashwat Jain 🥰
      </footer>
    </div>
  );
}

/*
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { categories } from '../server/db/schema';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

*/