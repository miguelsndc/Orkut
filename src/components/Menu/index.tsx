import { useState } from 'react';
import Image from 'next/image';

import * as S from './styles';

import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';

import { AiOutlineHome, AiOutlineTeam } from 'react-icons/ai';

const MenuOptions = [
	{ name: 'Inicio', slug: '/' },
	{ name: 'Amigos', slug: '/followers' },
	{ name: 'Comunidades', slug: '/communities' },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Menu() {
	const { user, logout } = useAuth();
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.push('/login');
	}

	return (
		<S.Wrapper>
			<div className='container'>
				<S.Logo src={`${BASE_URL}/logo.svg`} />

				<nav className='nav-links' style={{ flex: 1 }}>
					{MenuOptions.map(menuItem => (
						<Link
							key={`key__${menuItem.name.toLocaleLowerCase()}`}
							href={`${menuItem.slug.toLocaleLowerCase()}`}
						>
							{menuItem.name}
						</Link>
					))}
				</nav>
				<nav>
					<div className='profile'>
						{user && <Image src={user.picture} width={128} height={128} />}
						<IoLogOutOutline size='1.65rem' onClick={handleLogout} />
					</div>
				</nav>
			</div>
			<footer className='bottom-nav'>
				<Link href='/'>
					<AiOutlineHome />
				</Link>
				<Link href='/followers'>
					<AiOutlineTeam />
				</Link>
			</footer>
		</S.Wrapper>
	);
}
