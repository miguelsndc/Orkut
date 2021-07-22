import Router from 'next/router';
import NProgress from 'nprogress';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from '@styles/globals';

import lightTheme from '@styles/theme/light';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';
import client from 'src/config/apolloClient';
import { AuthProvider } from 'src/context/AuthContext';

import 'src/services/firebase/config';
import '@styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
	return (
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
	);
}
