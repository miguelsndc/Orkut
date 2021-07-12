import NostalgicIconSet from '@components/NostalgicIconSet';
import ProfileSidebar from '@components/ProfileSidebar';
import MainGrid from '@components/MainGrid';
import Menu from '@components/Menu';
import Box from '@components/Box';

import * as S from '@styles/pages/Home';

export default function Home() {
	const githubUser = 'miguelsndc';

	return (
		<>
			<Menu githubUser={githubUser} />
			<MainGrid>
				<S.GridItem className='profileArea' gridArea='profileArea'>
					<ProfileSidebar user={githubUser} />
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
						<h2 className='smallTitle'>Pessoas da Comunidade</h2>
					</Box>
					<Box>
						<h2 className='smallTitle'>Comunidades</h2>
					</Box>
				</S.GridItem>
			</MainGrid>
		</>
	);
}
