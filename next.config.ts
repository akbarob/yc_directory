import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'placeskull.com',
                port: '',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '*',
                port: '',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
