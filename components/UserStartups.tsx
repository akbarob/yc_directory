import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_AUTHROR_QUERY } from '@/sanity/lib/query';
import React from 'react';
import StartUpCard, { StartUpTypeCard } from './StartUpCard';

type Props = { id: string };

const UserStartups = async ({ id }: Props) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHROR_QUERY, {
        id,
    });
    return (
        <>
            {startups?.length > 0 ? (
                startups?.map((startup: StartUpTypeCard) => (
                    <StartUpCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className='no-result'>No startups found</p>
            )}
        </>
    );
};

export default UserStartups;
