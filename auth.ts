import GitHub from 'next-auth/providers/github';
import { client } from './sanity/lib/client';
import { AUTHOR_BY_GITHUBID } from './sanity/lib/query';
import { writeclient } from './sanity/lib/write-client';
import NextAuth from 'next-auth';
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],

    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (!profile || !profile.id) {
                    console.error('Missing profile information');
                    return false;
                }

                const existingUser = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUBID, {
                        id: profile?.id,
                    });

                if (!existingUser) {
                    try {
                        await writeclient.create({
                            _type: 'author',
                            id: profile.id,
                            name: user.name,
                            email: user.email,
                            username: profile.login,
                            image: user.image,
                            bio: profile.bio,
                        });
                    } catch (error) {
                        console.error('Error creating user in Sanity:', error);
                        return false;
                    }
                }

                return true;
            } catch (error) {
                console.error('Error in signIn callback:', error);
                return false;
            }
        },

        async jwt({ token, account, profile }) {
            try {
                if (profile && account) {
                    const user = await client
                        .withConfig({ useCdn: false })
                        .fetch(AUTHOR_BY_GITHUBID, {
                            id: profile.id,
                        });

                    if (user) {
                        token.id = user._id;
                    }
                }
                return token;
            } catch (error) {
                console.error('Error in jwt callback:', error);
                return token;
            }
        },

        async session({ session, token }) {
            try {
                return {
                    ...session,
                    id: token.id,
                };
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        },
    },
});
