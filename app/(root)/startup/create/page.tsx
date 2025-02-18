import { auth } from '@/auth';
import Startupform from '@/components/Startupform';
import { redirect } from 'next/navigation';
import React from 'react';

// type Props = {};

async function page() {
    const session = await auth();

    if (!session) redirect('/');
    return (
        <>
            <section className='!min-h-[230px] pink_container'>
                <h1 className='heading'>Submit your startup</h1>
            </section>
            <section>
                <Startupform />
            </section>
        </>
    );
}

export default page;
