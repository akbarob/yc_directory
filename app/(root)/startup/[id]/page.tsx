import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUPBYID, STARTUPVIEWSPREVIEW } from '@/sanity/lib/query';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/view';
export const exprimental_ppr = true;

const md = markdownit();
const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const [data] = await client.fetch(STARTUPBYID, { id });
    console.log(data, id);

    if (!data) return notFound();

    const parsedContent = md.render(data?.pitch || '');

    return (
        <div>
            <section className='pink_container !min-h-[230px]'>
                <p className='tag'>{formatDate(data?._createdAt)}</p>{' '}
                <h1 className='heading'>{data?.title}</h1>
                <p className='sub-heading !max-w-3xl'>{data.description}</p>
            </section>{' '}
            <section className='section_container'>
                <Image
                    width={100}
                    height={100}
                    src={data?.image}
                    alt='thumbnail'
                    sizes='100'
                    className='w-full rounded-xl h-auto'
                />

                <div className='space-y-5 mt-10 max-w-4xl mx-auto'></div>
                <div className='flex-between gap-5 mt-10 max-w-4xl mx-auto'>
                    <Link
                        href={`user/${data?.author?.id}`}
                        className='flex gap-2 items-center mb-3'>
                        <Image
                            width={64}
                            height={64}
                            src={data?.author?.image}
                            alt='avatar'
                            sizes='100'
                            className='rounded-full drop-shadow-lg '
                        />
                        <div>
                            <p className='text-20-medium'>
                                {data?.author?.name}
                            </p>
                            <p className='text-16-medium !text-black-300'>
                                {' '}
                                @{data?.author?.username}
                            </p>
                        </div>
                    </Link>
                    <p className='category-tag'> {data?.category}</p>
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
            <section className=''>
                <Suspense fallback={<Skeleton className='view_sekelton' />}>
                    <View id={data?._id} />
                </Suspense>
            </section>
        </div>
    );
};

export default page;
