import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from 'src/context/AuthContext';

import { GlobalStyles } from '@styles/globals';
import lightTheme from '@styles/theme/light';

import client from 'src/config/apolloClient';

import 'src/services/firebase/config';
import '@styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/favicon.ico' />
			</Head>
			<ThemeProvider theme={lightTheme}>
				<GlobalStyles />
				<Toaster />
				<main>
					<AuthProvider>
						<ApolloProvider client={client}>
							<IconContext.Provider
								value={{ color: lightTheme.gray1, size: '1.2rem' }}
							>
								<Component {...pageProps} />
							</IconContext.Provider>
						</ApolloProvider>
					</AuthProvider>
				</main>
			</ThemeProvider>
		</>
	);
}
