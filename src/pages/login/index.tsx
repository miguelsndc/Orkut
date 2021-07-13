import * as S from '@styles/pages/Login';

import Image from 'next/image';

import { signIn } from 'next-auth/client';

export default function Login() {
	function handleGithubSignIn() {
		signIn('github', {
			callbackUrl: 'http://localhost:3000/',
		});
	}

	return (
		<S.Wrapper>
			<div className='container'>
				<div className='logoArea'>
					<h1>Alurakut</h1>
					<p>
						<strong>Conecte-se</strong> aos seus amigos e familiares usando
						recados e mensagens instantâneas
					</p>
					<p>
						<strong>Conheça</strong> novas pessoas através de amigos de seus
						amigos e comunidades
					</p>
					<p>
						<strong>Compartilhe </strong>
						seus vídeos, fotos e paixões em um só lugar
					</p>
				</div>
				<div className='formArea'>
					<div className='box'>
						<p>
							Acesse o <strong>Alurakut</strong> com a sua conta.
						</p>
						<button onClick={handleGithubSignIn}>
							<Image src='/images/github.svg' width={30} height={30} />
							<span>Login with Github</span>
						</button>
					</div>
				</div>
				<footer className='footerArea'>
					<p>
						© 2020 Orkut.br - <a href='/'>Sobre o Orkut.br </a>
						<a href='/'>Centro de segurança </a>
						<a href='/'>Privacidade </a>
						<a href='/'>Termos </a>
						<a href='/'>Contato </a>
					</p>
				</footer>
			</div>
		</S.Wrapper>
	);
}
