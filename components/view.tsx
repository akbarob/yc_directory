import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUPVIEWSPREVIEW } from '@/sanity/lib/query';
import { writeclient } from '@/sanity/lib/write-client';
import { after } from 'next/server';
type Props = {
    id: string;
};

const View = async ({ id }: Props) => {
    const [{ views: totalviews }] = await client
        .withConfig({ useCdn: false })
        .fetch(STARTUPVIEWSPREVIEW, { id });
    console.log('viees', totalviews);
    // to update the total views after fetching it
    after(
        async () =>
            await writeclient
                .patch(id)
                .set({ views: totalviews + 1 })
                .commit()
    );

    return (
        <div className='view-container'>
            <div className='absolute  -top-2'>
                <Ping />
            </div>
            <p className='view-text'>
                <span className='font-black'>
                    {' '}
                    Views : {new Intl.NumberFormat('en-IN').format(totalviews)}
                </span>
            </p>
        </div>
    );
};

export default View;
