import { CrownIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const startup = defineType({
    name: 'startup',
    title: 'Startup',
    type: 'document',
    icon: CrownIcon,
    fields: [
        defineField({ name: 'title', type: 'string' }),

        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: { type: 'author' },
        }),
        defineField({ name: 'views', type: 'number' }),
        defineField({ name: 'description', type: 'string' }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) =>
                Rule.min(1)
                    .max(120)
                    .required()
                    .error('Please enter a category'),
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'pitch',
            type: 'markdown',
        }),
    ],
    // preview: {
    //     select: { title: 'name' },
    // },
});