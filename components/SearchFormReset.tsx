'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const SearchFormReset = () => {
    function reset() {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) form.reset();
    }
    return (
        <button type='reset' onClick={reset}>
            <Link href='/' className='text-white search-btn'>
                <X size={25} />
            </Link>
        </button>
    );
};

export default SearchFormReset;
