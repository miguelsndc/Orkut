import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import QUERY_ALL_COMMUNITIES from 'src/graphql/queryAllCommunities.graphql';
import client from 'src/config/apolloClient';
import ProfileSidebar from '@components/ProfileSidebar';
import Box from '@components/Box';

import * as S from '@styles/pages/FriendList';
import Image from 'next/image';
import Link from 'next/Link';
import CreateCommunityForm from '@components/CreateCommunityForm';

type Community = {
	__typename: string;
	title: string;
	imageUrl: string;
	id: string;
	creatorSlug: string;
};

type AllCommunitiesProps = {
	communities: Community[];
};

export default function AllCommunities({ communities }: AllCommunitiesProps) {
	console.log(communities);
	return (
		<S.Container>
			<div className='profile'>
				<ProfileSidebar user={'miguelsndc'} />
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
						{communities.map(community => {
							return (
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
	const { data } = await client.query({
		query: QUERY_ALL_COMMUNITIES,
		variables: {},
	});

	return {
		props: {
			communities: data.allCommunities,
		},
	};
};
