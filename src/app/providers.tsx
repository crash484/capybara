"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {trpc, trpcClient} from "../lib/utils/trpc"
import { useState } from "react";

export default function Providers({children}: {children:React.ReactNode}){
    const [queryClient] = useState(()=> new QueryClient());
    const [client] = useState(()=> trpcClient);
    return(
        <trpc.Provider client={client} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}