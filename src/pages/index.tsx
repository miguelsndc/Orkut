import { useEffect, useState } from 'react';

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

type PostType = {
	id: string;
	content: string;
	author: string;
	createdAt: string;
};

type QueryPosts = {
	allPosts: PostType[];
};

export default function Home() {
	const githubUser = 'miguelsndc';

	const communities = useQuery(QUERY_ALL_COMMUNITIES);
	const posts = useQuery<QueryPosts>(QUERY_ALL_POSTS);

	const [followers, setFollowers] = useState<Follower[]>([]);
	const [mostRecentPost, setMostRecentPost] = useState<PostType>(
		{} as PostType
	);

	useEffect(() => {
		api.get<Follower[]>(`/users/${githubUser}/followers`).then(response => {
			const { data } = response;
			setFollowers(data);
		});
	}, []);

	return (
		<MainGrid>
			<S.GridItem className='profileArea' gridArea='profileArea'>
				<ProfileSidebar user={'miguelsndc'} />
			</S.GridItem>
			<S.GridItem className='welcomeArea' gridArea='welcomeArea'>
				<Box>
					<CreatePostForm />
				</Box>

				{posts.loading ? (
					<Spinner />
				) : (
					posts.data.allPosts.map(post => <Post post={post} key={post.id} />)
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
						Comunidades{' '}
						<span>
							({!communities.loading && communities.data.allCommunities.length})
						</span>
					</h2>
					<S.ProfileRelationsWrapper>
						{communities.loading ? (
							<Spinner />
						) : (
							communities.data.allCommunities
								.slice(0, 6)
								.map(community => (
									<CommunitySmall
										key={community.id}
										name={community.title}
										imageURL={community.imageUrl}
									/>
								))
						)}
						<hr />
						<Link href='/communities/all'>Ver Todas</Link>
					</S.ProfileRelationsWrapper>
				</Box>
			</S.GridItem>
		</MainGrid>
	);
}
