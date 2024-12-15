import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

type Props = { query?: string };

const SearchForm = ({ query }: Props) => {
    return (
        <Form action='/' scroll={false} className='search-form'>
            <input
                name='query'
                defaultValue={query}
                className='search-input placeholder:opacity-65'
                placeholder='search startups'
            />
            <div className='flex gap-2'>
                {query && <SearchFormReset />}{' '}
                <button type='submit' className='search-btn text-white'>
                    <Search size={25} />
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;
