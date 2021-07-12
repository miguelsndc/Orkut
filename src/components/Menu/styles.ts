import styled from 'styled-components';

type MenuProfileSidebarProps = {
	isMenuOpen: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const Wrapper = styled.header<MenuProfileSidebarProps>`
	width: 100%;
	background-color: #308bc5;

	.alurakutMenuProfileSidebar {
		background: white;
		padding: 2.875rem;

		z-index: 100;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		top: 4rem;

		transition: 0.3s;

		pointer-events: ${({ isMenuOpen }) => (isMenuOpen ? 'all' : 'none')};
		opacity: ${({ isMenuOpen }) => (isMenuOpen ? '1' : '0')};
		transform: ${({ isMenuOpen }) =>
			isMenuOpen ? 'translateY(0)' : 'translateY(calc(-100% - 48px))'};

		@media (min-width: 860px) {
			display: none;
		}

		& > div {
			max-width: 400px;
			margin: auto;
		}

		a {
			font-size: 1.125rem;
		}

		.boxLink {
			font-size: 1.125rem;
			font-weight: 800;
			color: #2e7bb4;
			-webkit-text-decoration: none;
			text-decoration: none;
		}

		hr {
			margin-top: 0.75rem;
			margin-bottom: 8px;

			border-color: transparent;
			border-bottom-color: #ecf2fa;
		}
	}

	.container {
		display: flex;
		justify-content: space-between;

		background-color: #308bc5;
		max-width: 1110px;

		margin: auto;
		padding: 0.4375rem 1rem;

		position: relative;
		z-index: 101;

		@media (min-width: 860px) {
			justify-content: flex-start;
		}

		button {
			display: inline-block;
			align-self: center;

			border: 0;
			background: transparent;

			@media (min-width: 860px) {
				display: none;
			}
		}

		nav {
			display: none;

			@media (min-width: 860px) {
				display: flex;
			}

			a {
				font-size: 0.75rem;
				text-decoration: none;
				color: white;

				position: relative;

				padding: 0.625rem 1rem;

				&:after {
					content: ' ';
					display: block;

					background-color: #5292c1;

					width: 1px;
					height: 0.75rem;

					margin: auto;

					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
				}
			}
		}

		input {
			font-size: 0.75rem;
			color: #ffffff;

			background: #5579a1;

			padding: 0.625rem 2.625rem;

			background-image: url(${`${BASE_URL}/icons/search.svg`});
			background-position: 15px center;
			background-repeat: no-repeat;

			border: 0;
			border-radius: 1000px;

			::placeholder {
				color: #ffffff;
				opacity: 1;
			}
		}
	}
`;

export const Logo = styled.img`
	background-color: #ffffff;

	padding: 0.5625rem 0.875rem;
	border-radius: 1000px;
	height: 2.125rem;
`;
