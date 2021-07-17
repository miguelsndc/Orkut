import { createGlobalStyle } from 'styled-components';

import { AlurakutStyles } from 'src/lib/common';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	p, textarea,input,h1,h2,h3,h4,h5,h6,span,a {
		::selection {
					background: ${({ theme }) => theme.primaryElement};
					color: #fff;
				}
	}
	body {
		background: ${({ theme }) => theme.backgroundDefault};

		font-family: 'Inter',
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
