import Box from '@components/Box';
import nookies from 'nookies';
import * as S from '@styles/pages/FriendList';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import Menu from '@components/Menu';
import { getCommunities } from 'src/api';
import { Community } from 'src/types/Community';
import { User } from 'src/types/User';
import { Button } from '@components/Button';

type AllCommunities = {
	allCommunities: Community[];
};

type AllCommunitiesProps = AllCommunities;

export default function AllCommunities({
	allCommunities,
}: AllCommunitiesProps) {
	return (
		<>
			<Head>
				<title>Comunidades | Orkut</title>
			</Head>
			<Menu />
			<S.Container>
				<Box>
					<h2 className='title'>Comunidades</h2>
					<div className='path'>
						<span>
							<Link href='/'>Início </Link> {'>'} Comunidades
						</span>
						<Link href='/communities/new'>
							<Button>Criar nova comunidade</Button>
						</Link>
					</div>
					<hr />
					<S.Table>
						<tbody>
							{allCommunities.map(community => (
								<tr key={community.id}>
									<Image src={community.poster} width={184} height={184} />
									<div>
										<h3>{community.title}</h3>
										<span>@{community.author.name}</span>
									</div>
								</tr>
							))}
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

	const data = await getCommunities();

	return {
		props: {
			allCommunities: data,
		},
	};
};
