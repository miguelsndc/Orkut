import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import QUERY_ALL_COMMUNITIES from 'src/graphql/queryAllCommunities.graphql';
import client from 'src/config/apolloClient';
import ProfileSidebar from '@components/ProfileSidebar';
import Box from '@components/Box';

import * as S from '@styles/pages/FriendList';
import Image from 'next/image';
import Link from 'next/link';
import CreateCommunityForm from '@components/CreateCommunityForm';
import { useQuery } from '@apollo/client';
import Spinner from '@components/Spinner';

type Community = {
	__typename: string;
	title: string;
	imageUrl: string;
	id: string;
	creatorSlug: string;
};

type AllCommunities = {
	allCommunities: Community[];
};

export default function AllCommunities() {
	const { data, error, loading } = useQuery<AllCommunities>(
		QUERY_ALL_COMMUNITIES
	);

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
						{loading ? (
							<Spinner />
						) : (
							data.allCommunities.map(community => (
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
							))
						)}
					</tbody>
				</S.Table>
			</Box>
		</S.Container>
	);
}
