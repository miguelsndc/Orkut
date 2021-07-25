import { useEffect, useState } from 'react';
import nookies from 'nookies';

import Head from 'next/head';

import CommunitySmall from '@components/CommunitySmall';
import ProfileSidebar from '@components/ProfileSidebar';
import MainGrid from '@components/MainGrid';
import Box from '@components/Box';

import Link from 'next/link';

import { Follower } from 'src/types/Follower';

import * as S from '@styles/pages/Home';
import CreatePostForm from '@components/CreatePostForm';
import Post from '@components/Post';
import FriendSmall from '@components/FriendSmall';
import Spinner from '@components/Spinner';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import Menu from '@components/Menu';
import { useQuery } from 'react-query';
import { getCommunities, getFollowers, getPosts } from 'src/api';
import { Community } from 'src/types/Community';
import { User } from 'src/types/User';
import api from 'src/services/api';

type HomeProps = {
	communities: Community[];
	followers: Follower[];
	user: User;
};

export default function Home({ communities, followers }: HomeProps) {
	const { data, isLoading, refetch } = useQuery('posts', getPosts);

	return (
		<>
			<Head>
				<title>Alurakut | Home</title>
			</Head>
			<Menu />
			<MainGrid>
				<S.GridItem gridArea='communityArea' className='communityArea'>
					<Box>
						<h2 className='smallTitle'>
							Comunidades <span>({communities.length})</span>
						</h2>
						<S.ProfileRelationsWrapper>
							{communities.slice(0, 6).map(community => (
								<CommunitySmall
									key={community.id}
									name={community.title}
									imageURL={community.poster}
								/>
							))}
							<hr />
							<Link href='/communities'>Ver Todas</Link>
						</S.ProfileRelationsWrapper>
					</Box>
				</S.GridItem>
				<S.GridItem className='welcomeArea' gridArea='welcomeArea'>
					<Box>
						<CreatePostForm onUiUpdate={() => refetch()} />
					</Box>

					{isLoading ? (
						<Spinner />
					) : (
						data.map(post => <Post post={post} key={post.id} />)
					)}
				</S.GridItem>
				<S.GridItem
					className='profileRelationsArea'
					gridArea='profileRelationsArea'
				>
					<Box>
						<h2 className='smallTitle'>
							Meus Seguidores <span>({followers.length})</span>
						</h2>
						<S.ProfileRelationsWrapper>
							{followers.slice(0, 6).map(follower => (
								<FriendSmall
									key={follower.id}
									name={follower.login}
									imageURL={follower.avatar_url}
								/>
							))}
							<hr />
							<Link href='/followers'>Ver Todos</Link>
						</S.ProfileRelationsWrapper>
					</Box>
				</S.GridItem>
			</MainGrid>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	let token: firebaseAdmin.auth.DecodedIdToken;

	try {
		const cookies = nookies.get(ctx);

		if (!cookies.token) {
			throw new Error('No token was found');
		}

		token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}

	const githubUserId = token.firebase.identities['github.com'][0];

	const communities = await getCommunities();

	const { data } = await api.get<Follower[]>(
		`/user/${githubUserId}/followers`,
		{
			headers: {
				Authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
			},
		}
	);

	return {
		props: {
			communities,
			followers: data,
		},
	};
};
