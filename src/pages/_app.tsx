import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from 'src/context/AuthContext';

import { GlobalStyles } from '@styles/globals';
import lightTheme from '@styles/theme/light';

import 'src/services/firebase/config';
import '@styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const queryClient = new QueryClient();

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
						<QueryClientProvider client={queryClient}>
							<IconContext.Provider
								value={{ color: lightTheme.gray1, size: '1.2rem' }}
							>
								<Component {...pageProps} />
							</IconContext.Provider>
						</QueryClientProvider>
					</AuthProvider>
				</main>
			</ThemeProvider>
		</>
	);
}
