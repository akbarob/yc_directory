// import { z } from 'zod';
// export const formSchecma = z.object({
//     title: z.string().min(3).max(100),
//     // .regex(regex)
//     description: z.string().min(20).max(500),
//     category: z.string().min(3).max(20),
//     link: z
//         .string()
//         .url()
//         .refine(async (url) => {
//             try {
//                 const res = await fetch(url, { method: 'HEAD' });
//                 const contentType = res.headers.get('content-type');

//                 return contentType?.startsWith('image/');
//             } catch {
//                 return false;
//             }
//         }),
//     pitch: z.string().min(10),
// });
import { z } from 'zod';

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    // link: z
    //     .string()
    //     .url()
    //     .refine(async (url) => {
    //         try {
    //             const res = await fetch(url, {
    //                 // method: 'HEAD',
    //                 mode: 'no-cors',
    //             });
    //             const contentType = res.headers.get('content-type');

    //             return contentType?.startsWith('image/');
    //         } catch {
    //             return false;
    //         }
    //     }),
    link: z
        .string()
        .url()
        .refine(
            (url) => {
                try {
                    const parsed = new URL(url);
                    const path = parsed.pathname.toLowerCase();
                    return [
                        '.jpg',
                        '.jpeg',
                        '.png',
                        '.gif',
                        '.webp',
                        '.avif',
                    ].some((ext) => path.endsWith(ext));
                } catch {
                    return false;
                }
            },
            {
                message:
                    'URL must point to an image file (.jpg, .jpeg, .png, .gif, .webp, or .avif)',
            }
        ),
    pitch: z.string().min(10),
});
