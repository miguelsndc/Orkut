import QUERY_ALL_COMMUNITIES from 'src/graphql/queries/allCommunities.graphql';
import ProfileSidebar from '@components/ProfileSidebar';
import Box from '@components/Box';
import nookies from 'nookies';
import * as S from '@styles/pages/FriendList';
import Image from 'next/image';
import Link from 'next/link';
import CreateCommunityForm from '@components/CreateCommunityForm';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import client from 'src/config/apolloClient';
import { User } from 'src/pages';

type Community = {
	title: string;
	imageUrl: string;
	id: string;
	creatorSlug: string;
};

type AllCommunities = {
	allCommunities: Community[];
	user: User;
};

type AllCommunitiesProps = AllCommunities;

export default function AllCommunities({
	allCommunities,
	user,
}: AllCommunitiesProps) {
	return (
		<S.Container>
			<div className='profile'>
				<ProfileSidebar user={user} />
			</div>
			<Box>
				<h2 className='title'>Comunidades</h2>
				<div className='path'>
					<Link href='/'>Início </Link> {'>'} Comunidades
				</div>
				<hr />
				<h4 className='subTitle'>Criar nova Comunidade</h4>
				<CreateCommunityForm />
				<hr />
				<h4 className='subTitle'>Comunidades Existentes</h4>
				<S.Table>
					<tbody>
						{allCommunities.map(community => (
							<tr key={community.id}>
								<Image
									src={community.imageUrl}
									width={184}
									height={184}
									placeholder='blur'
									blurDataURL={community.imageUrl}
								/>
								<div>
									<h3>{community.title}</h3>
									<span>@{community.creatorSlug}</span>
								</div>
							</tr>
						))}
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

	const { data } = await client.query<AllCommunities>({
		query: QUERY_ALL_COMMUNITIES,
	});

	return {
		props: {
			allCommunities: data.allCommunities,
			user: {
				name: token.name,
				picture: token.picture,
				email: token.email,
				uid: githubUserId,
			},
		},
	};
};
