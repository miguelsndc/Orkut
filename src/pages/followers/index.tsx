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
import { useQuery } from 'react-query';
import { getFollowers } from 'src/api';
import { User } from 'src/types/User';

type FollowerListProps = {
	followers: Follower[];
	user: User;
};

export default function FollowerList({ followers, user }: FollowerListProps) {
	const { data } = useQuery(
		'followers',
		async () => {
			const { data } = await getFollowers(user.uid);
			return data;
		},
		{
			initialData: followers,
		}
	);

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
						<a href='/'>Início </a> {'>'} Meus Seguidores
					</div>
					<S.Table>
						<tbody>
							{data.length > 0 &&
								data.map(follower => {
									return (
										<tr key={follower.id}>
											<Image
												src={follower.avatar_url}
												width={184}
												height={184}
												placeholder='blur'
												blurDataURL={follower.avatar_url}
											/>
											<div>
												<Link href={`/users/${follower.id}`}>
													<h3>{follower.login}</h3>
												</Link>
												<span>{follower.html_url}</span>
											</div>
										</tr>
									);
								})}
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

	const { data } = await getFollowers(githubUserId, {
		headers: {
			Authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
		},
	});

	return {
		props: {
			followers: data,
			user: {
				name: token.name,
				picture: token.picture,
				email: token.email,
				uid: githubUserId,
			},
		},
	};
};