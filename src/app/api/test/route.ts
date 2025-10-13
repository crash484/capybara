import { NextResponse } from "next/server";
import {db} from "@/server/db";
import {posts} from "@/server/db/schema"

export async function GET(){
    const data = await db.select().from(posts);
    return NextResponse.json({ success: true, data})
}