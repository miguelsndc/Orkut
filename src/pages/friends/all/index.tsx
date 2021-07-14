import Box from '@components/Box';
import ProfileSidebar from '@components/ProfileSidebar';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Follower } from 'src/types/Follower';
import api from 'src/services/api';
import Image from 'next/image';
import * as S from '@styles/pages/FriendList';

type AllFriendsProps = {
	data: Follower[];
};

export default function FriendList({ data }: AllFriendsProps) {
	return (
		<S.Container>
			<div className='profile'>
				<ProfileSidebar user={'miguelsndc'} />
			</div>
			<Box>
				<h2 className='title'>Meus Seguidores</h2>
				<div className='path'>
					<a href='/'>Início </a> {'>'} Meus Seguidores
				</div>
				<S.Table>
					<tbody>
						{data.map(follower => {
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
										<h3>{follower.login}</h3>
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
	const githubUser = 'miguelsndc';

	const { data } = await api.get<Follower[]>(`/users/${githubUser}/followers`);

	return {
		props: {
			data,
		},
	};
};
