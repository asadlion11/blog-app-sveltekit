import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

// export function load(){
//     return {
//         name: 'Mohamed'
//     }
// }

export const load: LayoutServerLoad = ({ locals }) => {
    // console.log(locals);
    // locals exist only for the current request/response lifecycle.
    // locals are request-scoped — they live only for the current request/response lifecycle.

    // For cross-request persistence, use sessions/cookies or a server-side store (not locals).
};