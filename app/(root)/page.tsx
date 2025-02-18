import StartUpCard, { StartUpTypeCard } from '@/components/StartUpCard';
import SearchForm from '../../components/SearchForm';
import { STARTUPS_QUERY } from '@/sanity/lib/query';
import { sanityFetch } from '@/sanity/lib/live';
import { auth } from '@/auth';
interface HomeProps {
    searchParams?: {
        query?: string;
    };
}
export default async function Home({ searchParams }: HomeProps) {
    // const query = await searchParams?.query;
    // No need to await searchParams.query, you can directly check if it's defined
    const query = await searchParams?.query;
    const params = await { search: query ? `${query}*` : null };
    // const posts = await client.fetch(STARTUPS_QUERY);

    const { data: posts } = await sanityFetch({
        query: STARTUPS_QUERY,
        params,
    });
    const session = await auth();
    console.log('session in page ts', session);

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
            <section className='section_container'>
                <p className='text-30-semibold'>
                    {query ? `Search result for *${query}*` : 'All startups'}
                </p>

                <ul className='mt-7 card_grid'>
                    {posts?.length > 0 ? (
                        posts?.map((post: StartUpTypeCard) => (
                            <StartUpCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p>No startups found</p>
                    )}
                </ul>
            </section>
        </>
    );
}
