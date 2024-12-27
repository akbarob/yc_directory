import StartUpCard from '@/components/StartUpCard';
import SearchForm from '../../components/SearchForm';
interface HomeProps {
    searchParams?: {
        query?: string;
    };
}
export default async function Home({ searchParams }: HomeProps) {
    const query = (await searchParams)?.query;

    const posts = [
        {
            _createdAt: new Date(),

            views: 55,
            author: { _id: 1, name: 'Akbar' },
            _id: 1,
            description:
                'influence why trick earn consider copper acres lay mile locate contain monkey definition week higher sat wool liquid box nearly map someone fuel pile',
            image: 'https://placeskull.com',
            category: 'liverpool',
            title: 'travel',
        },
    ];
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
                        posts?.map((post: StartUpCardType, index: number) => (
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
