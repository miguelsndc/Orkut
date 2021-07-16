import Box from '@components/Box';
import Image from 'next/image';

type ProfileSidebarProps = {
	user: string;
};

import * as S from './styles';

import {
	IoPersonOutline,
	IoBookOutline,
	IoCameraOutline,
	IoTrendingUpOutline,
	IoLogOutOutline,
	IoChatbubbleEllipsesOutline,
} from 'react-icons/io5';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
	const loader = ({ src }) => {
		return `https://github.com/${src}`;
	};

	return (
		<Box>
			<div>
				<div>
					<Image
						className='profile-picture'
						loader={loader}
						src={`${user}.png`}
						alt={`${user}`}
						width={360}
						height={360}
						placeholder='blur'
						blurDataURL={`https://github.com/${user}.png`}
					/>

					<hr />

					<h2 className='profile-name'>
						<a href={`/user/${user}`}>@{user}</a>
					</h2>

					<hr />

					<ProfileSidebarMenuDefault />
				</div>
			</div>
		</Box>
	);
}
