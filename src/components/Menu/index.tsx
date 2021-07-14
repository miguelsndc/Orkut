import { useState } from 'react';

import * as S from './styles';

import Link from 'next/Link';

const MenuOptions = [
	{ name: 'Inicio', slug: '/' },
	{ name: 'Amigos', slug: '/friends/all' },
	{ name: 'Comunidades', slug: '/communities/all' },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VERSION = process.env.NEXT_PUBLIC_VERSION;

export default function Menu({ githubUser }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
					<Link href='/login'>Sair</Link>
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
