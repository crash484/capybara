import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { db } from "@/server/db"
import { posts, categories, postsRelations} from "@/server/db/schema"