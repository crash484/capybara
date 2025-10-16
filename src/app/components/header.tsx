"use client"
import {Moon,Sun} from "lucide-react"
import {useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Header(){
    const{theme,setTheme} = useTheme()
    return (
          <div className="top sticky flex justify-between">
                <div className="text-xl p-3 hover:bg-violet-100 dark:hover:bg-gray-800 duration-340 ease-in-out h-fit w-fit rounded-lg">
                heyyyyyyyyyyy!
                </div>
                <div className="flex align-middle gap-3">
                <div className="rounded-lg text-xl p-3 hover:bg-violet-100 dark:hover:bg-gray-800 duration-340 ease-in-out h-fit">
                  <a href="/" >features</a>
                </div>
                <div className="p-3 rounded-lg hover:bg-violet-100 dark:hover:bg-gray-800 h-fit text-xl" >
                  <a href="/blog" >blogs</a>
                </div>
                <div className="pt-2.5">
                  <Button variant="outline" size="icon" onClick={()=>setTheme(theme==='light'?'dark':'light')}>
                    {theme==='light'?<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>:
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                </div>
        </div>
        </div>
    )
}