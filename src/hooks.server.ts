import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "$lib/auth";
import { sequence } from "@sveltejs/kit/hooks";
import { building } from "$app/environment";

//middleware
const authHandle: Handle = async ({event, resolve}) => {
    // register all auth routes
    return svelteKitHandler({event, resolve, auth, building});
}

const sessionHandle: Handle = async ({ event, resolve}) => {
    const session = await auth.api.getSession({
        headers: event.request.headers
    })
    // console.log('Session in handle:', session);
    event.locals.user = session?.user
    const response = await resolve(event)
    return response;
}

export const handle = sequence(authHandle, sessionHandle)