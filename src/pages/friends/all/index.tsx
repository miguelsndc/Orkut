import Box from '@components/Box';
import ProfileSidebar from '@components/ProfileSidebar';
import nookies from 'nookies';
import { Follower } from 'src/types/Follower';
import api from 'src/services/api';
import Image from 'next/image';
import * as S from '@styles/pages/FriendList';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import { User } from 'src/pages';

type FriendListProps = {
	followers: Follower[];
	user: User;
};

export default function FriendList({ followers, user }: FriendListProps) {
	return (
		<S.Container>
			<div className='profile'>
				<ProfileSidebar user={user} />
			</div>
			<Box>
				<h2 className='title'>Meus Seguidores</h2>
				<div className='path'>
					<a href='/'>Início </a> {'>'} Meus Seguidores
				</div>
				<S.Table>
					<tbody>
						{followers.length > 0 &&
							followers.map(follower => {
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
											<Link href={`/friends/${follower.login}`}>
												<h3>{follower.login}</h3>
											</Link>
											<span>{follower.url}</span>
										</div>
									</tr>
								);
							})}
					</tbody>
				</S.Table>
			</Box>
		</S.Container>
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
				statusCode: 302,
				destination: '/login',
			},
		};
	}

	const githubUserId = token.firebase.identities['github.com'][0];

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
