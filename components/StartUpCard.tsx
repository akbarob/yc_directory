import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
export type StartUpTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartUpCard = ({ post }: { post: StartUpTypeCard }) => {
    const {
        _id,
        image,
        _createdAt,
        views,
        author,
        title,
        description,
        category,
    } = post;

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                {' '}
                <p>{formatDate(_createdAt)}</p>
                <div className='flex'>
                    {' '}
                    <EyeIcon className='size-6 text-primary' />
                    <span className='text-19=6-medium'>{views}</span>
                </div>
            </div>{' '}
            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1 '>
                    <Link href={`/user/${author?.id}`} className=''>
                        {author?.name}
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>
                            {title}
                        </h3>
                    </Link>{' '}
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image
                        src={image}
                        alt='placeholder avatar'
                        width={48}
                        height={48}
                        sizes='100'
                        className='rounded-full aspect-square  object-cover object-center'
                    />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <Image
                    width={100}
                    height={100}
                    src={image}
                    sizes='100'
                    className='startup-card_img'
                    alt='startup-img'
                />
            </Link>{' '}
            <div className='flex-between gap-3 mt-5'>
                <Link href={`/query=${category?.toLowerCase()}`}>
                    {category}
                </Link>{' '}
                <Button>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    );
};

export default StartUpCard;
