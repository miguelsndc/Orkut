import NostalgicIconSet from '@components/NostalgicIconSet';
import ProfileRelations from '@components/ProfileRelations';
import ProfileSidebar from '@components/ProfileSidebar';
import MainGrid from '@components/MainGrid';
import Menu from '@components/Menu';
import Box from '@components/Box';

import * as S from '@styles/pages/Home';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';

const friends = [
	{
		id: 1,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
	{
		id: 2,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
	{
		id: 3,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
	{
		id: 61,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
	{
		id: 1321321,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
	{
		id: 43531,
		name: 'miguelsndc',
		imageURL: 'https://github.com/miguelsndc.png',
	},
];

export default function Home() {
	const [session, loading] = useSession();
	const router = useRouter();

	console.log(session?.accessToken);

	if (!session && !loading) router.push('/login');

	const Home = () => {
		return (
			<>
				<Menu githubUser={session.user} />
				<MainGrid>
					<S.GridItem className='profileArea' gridArea='profileArea'>
						<ProfileSidebar user={session.user} />
					</S.GridItem>
					<S.GridItem className='welcomeArea' gridArea='welcomeArea'>
						<Box>
							<h1 className='title'>Bem vindo</h1> <NostalgicIconSet />
						</Box>
					</S.GridItem>
					<S.GridItem
						className='profileRelationsArea'
						gridArea='profileRelationsArea'
					>
						<Box>
							<h2 className='smallTitle'>
								Meus Amigos <span>({friends.length})</span>
							</h2>
							<S.ProfileRelationsWrapper>
								{friends.map(friend => {
									return (
										<ProfileRelations
											key={friend.id}
											name={friend.name}
											imageURL={friend.imageURL}
										/>
									);
								})}
							</S.ProfileRelationsWrapper>
						</Box>
						<Box>
							<h2 className='smallTitle'>Comunidades</h2>
						</Box>
					</S.GridItem>
				</MainGrid>
			</>
		);
	};

	return (
		<>
			{session && <Home />}
			{loading && <h1>Carregando</h1>}
		</>
	);
}
