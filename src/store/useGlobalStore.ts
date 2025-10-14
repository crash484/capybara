import { create } from "zustand";

interface GlobalState {
    user: string | null
    setUser:(user: string | null) => void;
}

export const useGlobalStore = create<GlobalState>((set)=>({
    user:null,
    setUser:(user)=> set({user})
}));