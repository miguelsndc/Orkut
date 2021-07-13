import Box from '@components/Box';
import { DefaultSession } from 'next-auth';
import Image from 'next/image';

type ProfileSidebarProps = {
	user: DefaultSession['user'];
};

import * as S from './styles';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function ProfileSidebarMenuDefault() {
	return (
		<S.Wrapper>
			<nav>
				<a href='/'>
					<img src={`${BASE_URL}/icons/user.svg`} />
					Perfil
				</a>
				<a href='/'>
					<img src={`${BASE_URL}/icons/book.svg`} />
					Recados
				</a>
				<a href='/'>
					<img src={`${BASE_URL}/icons/camera.svg`} />
					Fotos
				</a>
				<a href='/'>
					<img src={`${BASE_URL}/icons/sun.svg`} />
					Depoimentos
				</a>
			</nav>
			<hr />
			<nav>
				<a href='/'>
					<img src={`${BASE_URL}/icons/plus.svg`} />
					GitHub Trends
				</a>
				<a href='/logout'>
					<img src={`${BASE_URL}//icons/logout.svg`} />
					Sair
				</a>
			</nav>
		</S.Wrapper>
	);
}

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
	return (
		<Box>
			<div>
				<div>
					<Image
						src={`${user.image}`}
						alt={`${user.name}`}
						width={320}
						height={320}
					/>

					<hr />

					<p>
						<a className='boxLink' href={`/user/${user.name}`}>
							@{user.name}
						</a>
					</p>

					<hr />

					<ProfileSidebarMenuDefault />
				</div>
			</div>
		</Box>
	);
}
