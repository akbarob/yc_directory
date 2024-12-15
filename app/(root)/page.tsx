import SearchForm from '../../components/SearchForm';
interface HomeProps {
    searchParams?: {
        query?: string;
    };
}
export default async function Home({ searchParams }: HomeProps) {
    const query = (await searchParams)?.query;
    return (
        <>
            <section className='pink_container'>
                {' '}
                <h1 className='heading'>
                    Pitch your startup, <br /> Connect with{' '}
                    <span className='text-indigo-700'>Akbar Badmus</span>
                </h1>
                <p className='sub-heading !max-w-3xl'>
                    Sumit ideas, vote on pitches and get noticed in virtual
                    competitions
                </p>
                <SearchForm query={query} />
            </section>
        </>
    );
}
