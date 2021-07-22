import { useEffect, useState } from 'react';
import nookies from 'nookies';

import Head from 'next/head';

import CommunitySmall from '@components/CommunitySmall';
import ProfileSidebar from '@components/ProfileSidebar';
import MainGrid from '@components/MainGrid';
import Box from '@components/Box';

import Link from 'next/link';

import { Follower } from 'src/types/Follower';
import QUERY_ALL_COMMUNITIES from 'src/graphql/queries/allCommunities.graphql';
import QUERY_ALL_POSTS from 'src/graphql/queries/allPosts.graphql';

import * as S from '@styles/pages/Home';
import api from 'src/services/api';
import { useQuery } from '@apollo/client';
import CreatePostForm from '@components/CreatePostForm';
import Post from '@components/Post';
import FriendSmall from '@components/FriendSmall';
import Spinner from '@components/Spinner';
import { useAuth } from 'src/hooks/useAuth';
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import client from 'src/config/apolloClient';
import Menu from '@components/Menu';

type Author = {
	name: string;
	picture: string;
	githubId: string;
};

export type PostType = {
	id: string;
	content: string;
	author: Author;
	createdAt: string;
};

type QueryPosts = {
	allPosts: PostType[];
};

export type User = {
	name: any;
	picture: string;
	email: string;
	uid: any;
};

type HomeProps = {
	communities: any[];
	followers: Follower[];
	user: User;
};

export default function Home({ communities, followers, user }: HomeProps) {
	const { data, error, loading, refetch } =
		useQuery<QueryPosts>(QUERY_ALL_POSTS);

	return (
		<>
			<Head>
				<title>Orkut | Home</title>
			</Head>
			<Menu githubUser={'miguelsndc'} />
			<MainGrid>
				<S.GridItem className='profileArea' gridArea='profileArea'>
					<ProfileSidebar user={user} />
				</S.GridItem>
				<S.GridItem className='welcomeArea' gridArea='welcomeArea'>
					<Box>
						<CreatePostForm onUiUpdate={() => refetch()} />
					</Box>

					{loading ? (
						<Spinner />
					) : (
						data.allPosts.map(post => <Post post={post} key={post.id} />)
					)}
				</S.GridItem>
				<S.GridItem
					className='profileRelationsArea'
					gridArea='profileRelationsArea'
				>
					<Box>
						<h2 className='smallTitle'>
							Meus Amigos <span>({followers.length})</span>
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
							<Link href='/friends/all'>Ver Todos</Link>
						</S.ProfileRelationsWrapper>
					</Box>
					<Box>
						<h2 className='smallTitle'>
							Comunidades <span>({communities.length})</span>
						</h2>
						<S.ProfileRelationsWrapper>
							{communities.slice(0, 6).map(community => (
								<CommunitySmall
									key={community.id}
									name={community.title}
									imageURL={community.imageUrl}
								/>
							))}
							<hr />
							<Link href='/communities/all'>Ver Todas</Link>
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

	const communities = await client.query({
		query: QUERY_ALL_COMMUNITIES,
	});

	const followersResponse = await api.get<Follower[]>(
		`/user/${githubUserId}/followers`,
		{
			headers: {
				Authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
			},
		}
	);

	return {
		props: {
			communities: communities.data.allCommunities,
			followers: followersResponse.data,
			user: {
				name: token.name,
				picture: token.picture,
				email: token.email,
				uid: githubUserId,
			},
		},
	};
};
