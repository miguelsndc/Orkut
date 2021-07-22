import Box from '@components/Box';
import Image from 'next/image';

import * as S from './styles';

import {
	IoPersonOutline,
	IoBookOutline,
	IoCameraOutline,
	IoTrendingUpOutline,
	IoLogOutOutline,
	IoChatbubbleEllipsesOutline,
} from 'react-icons/io5';

import { User } from 'src/pages';

type ProfileSidebarProps = {
	user: User;
};

function ProfileSidebarMenuDefault() {
	return (
		<S.Wrapper>
			<nav>
				<a href='/'>
					<IoPersonOutline />
					Perfil
				</a>
				<a href='/'>
					<IoBookOutline />
					Recados
				</a>
				<a href='/'>
					<IoCameraOutline />
					Fotos
				</a>
				<a href='/'>
					<IoChatbubbleEllipsesOutline />
					Depoimentos
				</a>
			</nav>
			<hr />
			<nav>
				<a href='/'>
					<IoTrendingUpOutline />
					GitHub Trends
				</a>
				<a href='/logout'>
					<IoLogOutOutline />
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
						className='profile-picture'
						src={user.picture}
						alt={`${user.name}`}
						width={360}
						height={360}
						placeholder='blur'
						blurDataURL={user.picture}
					/>

					<hr />

					<h2 className='profile-name'>
						<a href={`/user/${user.uid}`}>@{user.name}</a>
					</h2>

					<hr />

					<ProfileSidebarMenuDefault />
				</div>
			</div>
		</Box>
	);
}
