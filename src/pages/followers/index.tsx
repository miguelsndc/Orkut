import Box from '@components/Box';
import Head from 'next/head';
import ProfileSidebar from '@components/ProfileSidebar';
import nookies from 'nookies';
import { Follower } from 'src/types/Follower';
import Image from 'next/image';
import * as S from '@styles/pages/FriendList';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import Menu from '@components/Menu';
import { useInfiniteQuery } from 'react-query';
import { getFollowers } from 'src/api';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import { User } from 'src/types/User';
import { Fragment, useEffect } from 'react';
import Spinner from '@components/Spinner';

type FollowerListProps = {
	user: User;
};

export type FollowerResponse = {
	hasMore: boolean;
	nextPage: number;
	data: Follower[];
};

const ObserverOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.8,
};

export default function FollowerList({ user }: FollowerListProps) {
	const { elementRef, isVisible } = useIntersectionObserver(ObserverOptions);

	const { fetchNextPage, isFetchingNextPage, hasNextPage, data, isLoading } =
		useInfiniteQuery<FollowerResponse>(
			'followers',
			({ pageParam = 1 }) => getFollowers(user.uid, {}, pageParam, 10),
			{
				getNextPageParam: lastPage =>
					lastPage.hasMore ? lastPage.nextPage : undefined,
				retry: 3,
			}
		);

	useEffect(() => {
		if (isVisible && hasNextPage) fetchNextPage();
	}, [isVisible]);

	return (
		<>
			<Head>
				<title>Seguidores | Alurakut</title>
			</Head>
			<Menu />
			<S.Container>
				<Box>
					<h2 className='title'>Meus Seguidores</h2>
					<div className='path'>
						<span>
							<a href='/'>Início </a> {'>'} Meus Seguidores
						</span>
					</div>
					<S.Table>
						<tbody>
							{!isLoading ? (
								data.pages.map((page, index) => {
									return (
										<Fragment key={index}>
											{page.data.map(follower => {
												return (
													<tr key={follower.id}>
														<Image
															src={follower.avatar_url}
															width={184}
															height={184}
														/>
														<td>
															<Link href={`/users/${follower.id}`}>
																<h3>{follower.login}</h3>
															</Link>
															<span>{follower.html_url}</span>
														</td>
													</tr>
												);
											})}
										</Fragment>
									);
								})
							) : (
								<Spinner />
							)}
							{isFetchingNextPage && <Spinner />}
							<div ref={elementRef}>
								Gambiarra pra pegar o infinite scroll, depois eu arrumo
							</div>
						</tbody>
					</S.Table>
				</Box>
			</S.Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	let token: firebaseAdmin.auth.DecodedIdToken;

	try {
		const cookies = nookies.get(ctx);
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

	return {
		props: {
			user: {
				name: token.name,
				picture: token.picture,
				email: token.email,
				uid: githubUserId,
			},
		},
	};
};
