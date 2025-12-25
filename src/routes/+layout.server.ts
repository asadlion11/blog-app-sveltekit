import type { LayoutServerLoad } from './$types';

// export function load(){
//     return {
//         name: 'Mohamed'
//     }
// }

export const load: LayoutServerLoad = ({ locals }) => {
    console.log(locals);
};