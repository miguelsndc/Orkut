import { useState } from 'react';

import { signOut } from 'next-auth/client';

import * as S from './styles';

import Link from 'next/Link';

const MenuOptions = [
	{ name: 'Inicio', slug: '/' },
	{ name: 'Amigos', slug: '/amigos' },
	{ name: 'Comunidades', slug: '/comunidades' },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VERSION = process.env.NEXT_PUBLIC_VERSION;

export default function Menu({ githubUser }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function handleSignOut() {
		signOut({ callbackUrl: 'http://localhost:3000/login' });
	}

	return (
		<S.Wrapper isMenuOpen={isMenuOpen}>
			<div className='container'>
				<S.Logo src={`${BASE_URL}/logo.svg`} />

				<nav style={{ flex: 1 }}>
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
					<a onClick={handleSignOut}>Sair</a>
					<div>
						<input placeholder='Pesquisar no Orkut' />
					</div>
				</nav>

				<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen && (
						<img src={`${BASE_URL}/icons/menu-open.svg?v=${VERSION}`} />
					)}
					{!isMenuOpen && (
						<img src={`${BASE_URL}/icons/menu-closed.svg?v=${VERSION}`} />
					)}
				</button>
			</div>
		</S.Wrapper>
	);
}
