import { SanityLive } from '@/sanity/lib/live';
import Navbar from '../../components/Navbar';
import { Toaster } from '@/components/ui/toaster';
export default function Layout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    return (
        <main className='font-work-sans'>
            <Toaster />
            <Navbar />
            <SanityLive />
            {children}
        </main>
    );
}
