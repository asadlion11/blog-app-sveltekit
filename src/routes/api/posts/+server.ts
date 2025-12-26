// endpoint to get all posts

import { db } from "$lib/server/db";
import { json, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({}) => {
    const posts = await db.query.post.findMany();
    return json(posts); 
}

// api route: http://localhost:5173/api/posts