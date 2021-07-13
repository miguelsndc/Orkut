import styled, { css } from 'styled-components';

const LoginScreen = css`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100vh;

	@media (min-width: 860px) {
		align-items: center;
	}

	.container {
		:root {
			--backgroundPrimary: #d9e6f6;
			--backgroundSecondary: #f1f9fe;
			--backgroundTertiary: #ffffff;
			--backgroundQuarternary: #bbcde8;
			--colorPrimary: #2e7bb4;
			--colorSecondary: #388bb0;
			--colorTertiary: #2f4a71;
			--colorQuarternary: #d81d99;
			--textPrimaryColor: #333333;
			--textSecondaryColor: #ffffff;
			--textTertiaryColor: #5a5a5a;
			--textQuarternaryColor: #c5c6ca;
			--commonRadius: 8px;
		}

		display: grid;
		grid-template-areas:
			'logoArea'
			'formArea'
			'footerArea';

		gap: 1rem;
		padding: 1rem;
		max-width: 500px;
		margin: 0 auto;

		@media (min-width: 860px) {
			width: 100%;
			grid-template-columns: 2fr 1fr;
			grid-template-areas:
				'logoArea formArea'
				'logoArea formArea'
				'footerArea footerArea';
			max-width: 1110px;
		}

		.logoArea {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-wrap: wrap;

			grid-area: logoArea;
			min-height: 263px;

			border-radius: 8px;
			text-align: center;
			padding: 1rem;

			background: ${({ theme }) => theme.backgroundTertiary};

			h1 {
				font-size: 5rem;
			}

			p {
				font-size: 0.875rem;
				line-height: 1.2;

				&:not(:last-child) {
					margin-bottom: 0.875rem;
				}

				strong {
					color: ${({ theme }) => theme.quarternaryText};
				}
			}
		}

		.formArea {
			grid-area: formArea;
			display: flex;
			justify-content: center;
			align-items: center;

			border-radius: 8px;

			min-height: 224px;

			background: ${({ theme }) => theme.backgroundSecondary};

			.box {
				max-width: 209px;

				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				text-align: center;

				background-color: var(--backgroundSecondary);

				p {
					font-size: 0.875rem;
				}

				button {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					padding: 0.475rem;

					border: 2px solid ${({ theme }) => theme.gray1};
					border-radius: 8px;

					color: ${({ theme }) => theme.gray1};

					font-weight: 500;

					cursor: pointer;
				}

				button span {
					margin-left: 0.4rem;
				}
			}

			@media (min-width: 860px) {
				min-height: 282px;
			}
		}

		.footerArea {
			grid-area: footerArea;
			padding: 1rem;
			border-radius: 8px;

			text-align: center;

			a {
				margin: 0 0.35rem;
			}

			background: ${({ theme }) => theme.backgroundQuarternary};
		}
	}
`;

export const Wrapper = styled.div`
	${LoginScreen}
`;
