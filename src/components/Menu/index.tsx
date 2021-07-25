import Image from 'next/image';

import * as S from './styles';

import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { useAuth } from 'src/hooks/useAuth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const MenuOptions = [
	{ name: 'Inicio', slug: '/' },
	{ name: 'Amigos', slug: '/followers' },
	{ name: 'Comunidades', slug: '/communities' },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Menu() {
	const { user, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

	async function handleLogout() {
		await logout();
		router.push('/login');
	}

	function handleOpenMenu() {
		setIsMenuOpen(true);
	}
	function handleCloseMenu() {
		setIsMenuOpen(false);
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
					<div className='mobile-menu'>
						{isMenuOpen ? (
							<AiOutlineClose size='1.4rem' onClick={handleCloseMenu} />
						) : (
							<AiOutlineMenu size='1.4rem' onClick={handleOpenMenu} />
						)}
					</div>
				</nav>
				{isMenuOpen && (
					<nav className='menu-overlay'>
						<div>
							{user && <Image src={user.picture} width={128} height={128} />}
							<AiOutlineClose size='1.4rem' onClick={handleCloseMenu} />
						</div>
						<ul>
							<li>
								<Link href='/'>Início</Link>
							</li>
							<li>
								<Link href='/followers'>Amigos</Link>
							</li>
							<li>
								<Link href='/communities'>Comunidades</Link>
							</li>
							<li onClick={handleLogout}>
								<a>Sair</a>
							</li>
						</ul>
					</nav>
				)}
			</div>
		</S.Wrapper>
	);
}
