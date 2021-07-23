import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import * as S from '@styles/pages/404';
import { Button } from '@components/Button';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 | Alurakut</title>
			</Head>
			<S.Wrapper>
				<Image src='/images/404.svg' width={400} height={400} />
				<h1>O Conteúdo que você solicitou não foi encontrado ;(</h1>
				<Link href='/'>
					<Button>Voltar para Home</Button>
				</Link>
			</S.Wrapper>
		</>
	);
}
