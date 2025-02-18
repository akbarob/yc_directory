import { auth } from '@/auth';
import { StartUpcardSkeleton } from '@/components/StartUpCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID } from '@/sanity/lib/query';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

export const experimental_ppr = true;
type Props = {
    params: Promise<{ id: string }>;
};

const page = async ({ params }: Props) => {
    const id = (await params)?.id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_ID, { id });
    if (!user) return notFound();
    return (
        <>
            <section className='profile_container'>
                <div className='profile_card'>
                    <div className='profile_title'>
                        <h3 className='text-24-black uppercase text-center'>
                            {user?.name}
                        </h3>
                    </div>
                    <Image
                        src={user?.image}
                        alt='profile-icon'
                        width={220}
                        height={220}
                        className='profile_image'
                        // sizes='100'
                    />
                    <p className='text-30-extrabold mt-7 text-center'>
                        @{user?.username}
                    </p>
                    <p className='text-14-normal mt-1 text-center'>
                        {user?.bio}
                    </p>
                </div>{' '}
                <div className='flex-1 flex flex-col gap-5 xl:-mt-5'>
                    <p className='text-30-bold'>
                        {session?.id === id ? 'Your' : 'All'} startups
                    </p>

                    <ul className='card_grid-sm'>
                        <Suspense fallback={<StartUpcardSkeleton />}>
                            <UserStartups id={id} />
                        </Suspense>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default page;
