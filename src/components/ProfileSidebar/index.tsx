import Box from '@components/Box';
import Image from 'next/image';

import * as S from './styles';

import { IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';

import { User } from 'src/types/User';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';

type ProfileSidebarProps = {
	user: User;
};

export default function ProfileSidebar({ user }: ProfileSidebarProps) {
	const { logout } = useAuth();
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.push('/login');
	}

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
						<a href={`/users/${user.uid}`}>@{user.name}</a>
					</h2>

					<hr />

					<S.Wrapper>
						<nav>
							<a href='/users/'>
								<IoPersonOutline />
								Perfil
							</a>
						</nav>
						<hr />
						<nav>
							<a onClick={handleLogout}>
								<IoLogOutOutline />
								Sair
							</a>
						</nav>
					</S.Wrapper>
				</div>
			</div>
		</Box>
	);
}
