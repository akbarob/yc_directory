import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
    PLAYLIST_BY_SLUG_QUERY,
    STARTUPBYID,
    // STARTUPVIEWSPREVIEW,
} from '@/sanity/lib/query';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/view';
import StartUpCard, { StartUpTypeCard } from '@/components/StartUpCard';

export const experimental_ppr = true;

const md = markdownit();
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params)?.id;

    const [[data], { select: editorStartups }] = await Promise.all([
        client.fetch(STARTUPBYID, { id }),
        await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: 'editor-picks',
        }),
    ]);
    // const [data] = await client.fetch(STARTUPBYID, { id });

    if (!data) return notFound();

    const parsedContent = md.render(data.pitch || '');

    return (
        <div>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(data._createdAt)}</p>{' '}
                <h1 className='heading'>{data.title}</h1>
                <p className='sub-heading !max-w-3xl'>{data.description}</p>
            </section>{' '}
            <section className='section_container'>
                <Image
                    width={1200}
                    height={675}
                    src={data.image || ''}
                    alt={`${data.title} thumbnail`}
                    sizes='(max-width: 1200px) 100vw, 1200px'
                    className='w-full rounded-xl h-auto'
                    priority
                />

                <div className='space-y-5 mt-10 max-w-4xl mx-auto'></div>
                <div className='flex-between gap-5 mt-10 max-w-4xl mx-auto'>
                    <Link
                        href={`user/${data.author.id}`}
                        className='flex gap-2 items-center mb-3'>
                        <Image
                            width={64}
                            height={64}
                            src={data.author.image}
                            alt='avatar'
                            sizes='100'
                            className='rounded-full drop-shadow-lg '
                        />
                        <div>
                            <p className='text-20-medium'>{data.author.name}</p>
                            <p className='text-16-medium !text-black-300'>
                                {' '}
                                @{data.author.username}
                            </p>
                        </div>
                    </Link>
                    <p className='category-tag'> {data.category}</p>
                </div>
                <h3 className='text-30-bold'>Pitch details</h3>
                {parsedContent ? (
                    <article
                        className='prose max-w-4xl break-all font-work-sans'
                        dangerouslySetInnerHTML={{ __html: parsedContent }}
                    />
                ) : (
                    <p className='no-result'>No details provided</p>
                )}
                <hr className='divider ' />

                {/* EDIOR SELECTED STARTUPS */}
            </section>
            {editorStartups?.length > 0 && (
                <div className='max-w-4xl mx-auto'>
                    <p className='text-30-semibold'>Editor Picks</p>

                    <ul className='mt-7 crad_grid-sm'>
                        {editorStartups?.map(
                            (item: StartUpTypeCard, i: number) => (
                                <StartUpCard key={i} post={item} />
                            )
                        )}
                    </ul>
                </div>
            )}
            <section className=''>
                <Suspense fallback={<Skeleton className='view_sekelton' />}>
                    <View id={data._id} />
                </Suspense>
            </section>
        </div>
    );
};

export default page;
