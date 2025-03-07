import { SanityLive } from '@/sanity/lib/live';
import Navbar from '../../components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
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
            <Analytics />
        </main>
    );
}
