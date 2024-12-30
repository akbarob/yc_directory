import { SanityLive } from '@/sanity/lib/live';
import Navbar from '../../components/Navbar';

export default function Layout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <main className='font-work-sans'>
            <Navbar />
            <SanityLive />
            {children}
        </main>
    );
}
