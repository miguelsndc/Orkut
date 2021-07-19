import Box from '@components/Box';
import ProfileSidebar from '@components/ProfileSidebar';
import { Follower } from 'src/types/Follower';
import api from 'src/services/api';
import Image from 'next/image';
import * as S from '@styles/pages/FriendList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Spinner from '@components/Spinner';

export default function FriendList() {
	const [followers, setFollowers] = useState<Follower[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const githubUser = 'miguelsndc';

	async function getFollowers() {
		setIsLoading(true);

		try {
			const { data } = await api.get<Follower[]>(
				`/users/${githubUser}/followers`
			);

			setFollowers(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getFollowers();
	}, []);

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
						{isLoading ? (
							<Spinner />
						) : (
							<>
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
							</>
						)}
					</tbody>
				</S.Table>
			</Box>
		</S.Container>
	);
}
