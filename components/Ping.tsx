import React from 'react';

type Props = {};

const Ping = (props: Props) => {
    return (
        <div className='relative'>
            <div className='-left-4 top-1 absolute'>
                <span className='flex size-[11px]'>
                    <span className='absolute inlixe-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>{' '}
                    <span className='relative   size-[11px] inline-flex rounded-full bg-primary'></span>
                </span>
            </div>
        </div>
    );
};

export default Ping;
