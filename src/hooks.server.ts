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

export const handle = sequence(authHandle)  