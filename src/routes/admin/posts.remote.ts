import { form, getRequestEvent, query } from "$app/server";
import { auth } from "$lib/auth";
import { db } from "$lib/server/db";
import { post } from "$lib/server/db/schema";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import * as v from "valibot"

// get all post from database using drizzle orm
export const get_all_posts = query(async () => db.query.post.findMany())

// get single post by id from database
export const get_post_by_id = query(v.string(), async (id) => 
    db.query.post.findFirst({
        where: (p, { eq }) => eq(p.id, id)
    })
)


//Mutation in Remote functions
// Create post
export const create_post = form(
    // data that sent from client to server to create a post and their validation using valibot
    v.object({
        title: v.pipe(v.string(), v.nonEmpty("Title is required")),
        body: v.pipe(v.string(), v.nonEmpty()),
    }), 
    async({ title, body }) => {
        // remote function can' access/get  the locals so get current user info and session,
        const event = getRequestEvent() // get the request event
        const session = await auth.api.getSession({
            headers: event.request.headers
        }) // get the headers if the current session(headers contain the cookie with session id and user info)
        //check if user is unauthenticated/not logged in / does not exist
        if (!session?.user?.id) {
            throw error(401, "Unauthorized")
        }

        // generate slug from title
        const slug = title.toLowerCase().replace(/ /g, "-")

        // create post in database/ inser query to database using drizzle orm
        await db.insert(post).values({
            title,
            body,
            slug,
            authorId: session?.user.id
        })

        // after done creating a post rirect to admin: posts page
        redirect(303, '/admin')
})

// Update post
export const update_post = form(
    v.object({
        id: v.pipe(v.string(), v.nonEmpty()),
        title: v.pipe(v.string(), v.nonEmpty("Title is required")),
        body: v.pipe(v.string(), v.nonEmpty()),
    }), 
    async({ id, title, body }) => {
        const event = getRequestEvent() 
        const session = await auth.api.getSession({
            headers: event.request.headers
        })
        if (!session?.user?.id) {
            throw error(401, "Unauthorized")
        }

        const slug = title.toLowerCase().replace(/ /g, "-")

        await db.update(post).set({
            title,
            body,
            slug,
     
        }).where(eq(post.id, id))

        redirect(303, '/admin')
})