import { auth, signIn, signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export interface NavbarProps {
    // Removing empty string type as it's not needed
}

export default async function Navbar({}: NavbarProps) {
    const session = await auth();

    // Server action for login
    const handleLogin = async () => {
        'use server';
        await signIn('github');
    };

    // Server action for logout
    const handleLogout = async () => {
        'use server';
        await signOut();
    };

    return (
        <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image
                        className=''
                        alt='Logo'
                        src='/logo.png'
                        width={144}
                        height={30}
                    />
                </Link>

                <div className='flex items-center gap-5'>
                    {session?.user ? (
                        <>
                            <Link href='/startup/create' className=''>
                                <span className='max-sm:hidden '>Create</span>
                                <BadgePlus className='sm:hidden size-6 text-red-500' />
                            </Link>
                            <form action={handleLogout}>
                                <span>Logout</span>
                                <LogOut className='sm:hidden size-6 text-red-500' />
                            </form>

                            <Link
                                href={`/user/${session?.user?.id}`}
                                className='flex  justify-star gap-2 items-center'>
                                <Image
                                    className='rounded-full w-[30px]'
                                    alt='avi'
                                    src={`${session?.user?.image}`}
                                    width={144}
                                    height={30}
                                />{' '}
                                <Avatar className='size-10'>
                                    <AvatarImage
                                        src={`${session?.user?.image || ''}`}
                                        alt={`${session?.user?.name || ''}`}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={handleLogin}>
                            <button type='submit'>Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
}
