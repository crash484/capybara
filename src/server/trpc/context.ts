import { db } from "../db/index";

//context function runs for every requests
export const createContext = async ()=>{
    return{
        db,
    };
};

//this helps trpc understand what context fields are availible
export type Context = Awaited<ReturnType<typeof createContext>>;