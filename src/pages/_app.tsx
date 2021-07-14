import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '@styles/globals';

import lightTheme from '@styles/theme/light';
import Menu from '@components/Menu';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyles />
			<main>
				<Menu githubUser={'miguelsndc'} />
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	);
}
