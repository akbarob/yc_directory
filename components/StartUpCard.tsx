import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

type Props = { post: StartUpCardType };

const StartUpCard = ({ post }: Props) => {
    const {
        _id,
        image,
        _createdAt,
        views,
        author: { name, _id: author_id },
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
                    <Link href={`/user/${author_id}`} className=''>
                        {name}
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className='text-26-semibold line-clamp-1'>
                            {title}
                        </h3>
                    </Link>{' '}
                </div>
                <Link href={`/user/${author_id}`}>
                    <Image
                        src={image}
                        alt='placeholder avatar'
                        width={48}
                        height={48}
                        className='rounded-full'
                    />
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className='startup-card_desc'>{description}</p>
                <img
                    src={image}
                    className='startup-car_img'
                    alt='startup-imh'
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
