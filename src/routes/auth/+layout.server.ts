import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

//everything is in locals(user information)
export const load: LayoutServerLoad = ({ locals }) => {
    // check if user is logged in
    //locals.user is available user info like id, email, etc
    if (locals.user?.id) {
        //redirect to home page if use tried to signup or login while being logged in
        throw redirect(302, '/');
    }
}