import { createGlobalStyle } from 'styled-components';

import { AlurakutStyles } from 'src/lib/common';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		background: ${({ theme }) => theme.backgroundDefault};

		font-family: 'Rubik',
			-apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto,
			Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue',
			sans-serif;
	}

	#__next {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	@media (max-width: 1366px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 1080px) {
    html {
      font-size: 87.5%;
    }
  }

`;
