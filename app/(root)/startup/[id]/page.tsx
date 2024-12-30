import { client } from '@/sanity/lib/client';
import { STARTUPBYID } from '@/sanity/lib/query';
import { notFound } from 'next/navigation';
import React from 'react';

export const exprimental_ppr = true;

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const [data] = await client.fetch(STARTUPBYID, { id });
    console.log(data, id);

    if (!data) return notFound();
    return (
        <div>
            {' '}
            <h1 className='text-3xl'>{data?.title}</h1>
        </div>
    );
};

export default page;
