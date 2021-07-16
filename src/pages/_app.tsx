import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from '@styles/globals';

import lightTheme from '@styles/theme/light';
import Menu from '@components/Menu';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';
import client from 'src/config/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyles />
			<Toaster />
			<main>
				<ApolloProvider client={client}>
					<IconContext.Provider
						value={{ color: lightTheme.gray1, size: '1.2rem' }}
					>
						<Menu githubUser={'miguelsndc'} />
						<Component {...pageProps} />
					</IconContext.Provider>
				</ApolloProvider>
			</main>
		</ThemeProvider>
	);
}
