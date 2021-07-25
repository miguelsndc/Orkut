import styled from 'styled-components';

export const Wrapper = styled.header`
	width: 100%;
	background-color: #fff;

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
			color: ${({ theme }) => theme.gray1};
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

		background-color: #fff;
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

		.nav-links {
			display: none;

			@media (min-width: 860px) {
				display: flex;
			}

			a {
				font-size: 0.95rem;
				text-decoration: none;
				color: ${({ theme }) => theme.gray1};
				font-weight: 500;
				font: inherit;

				padding: 0.625rem 1rem;
				transition: color 0.2s;

				&:hover {
					color: ${({ theme }) => theme.primaryElement};
				}
			}
		}

		.profile {
			display: none;

			img {
				border-radius: 50%;
				width: 36px;
				height: 36px;
				background: ${({ theme }) => theme.gray4};
				cursor: pointer;

				&:hover {
					filter: brightness(0.9);
				}
			}

			img,
			svg {
				transition: all 0.2s;
				display: none;
			}

			svg {
				cursor: pointer;

				&:hover {
					stroke: ${({ theme }) => theme.primaryElement};
				}
			}

			@media (min-width: 860px) {
				display: flex;
				align-items: center;
				gap: 0.5rem;

				img,
				svg {
					display: block;
				}
			}
		}

		.mobile-menu {
			display: flex;
			align-items: center;
			justify-content: center;

			@media (min-width: 860px) {
				display: none;
			}
		}

		.menu-overlay {
			position: absolute;
			top: 0;
			height: 100vh;
			right: 0;
			width: 58vw;
			background: #fff;
			box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
			padding: 1.5rem;

			a {
				color: #333;
				text-decoration: none;
			}

			div {
				display: flex;
				align-items: center;
				justify-content: space-between;

				img {
					border-radius: 50%;
					width: 36px;
					height: 36px;
					background: ${({ theme }) => theme.gray4};
					cursor: pointer;

					&:hover {
						filter: brightness(0.9);
					}
				}
			}

			ul {
				list-style: none;
				text-align: center;
				margin-top: 4rem;

				li {
					margin: 1.5rem 0;
				}

				li:last-child {
					display: block;
					margin-top: auto;
				}
			}
		}

		.search input {
			background: ${({ theme }) => theme.backgroundDefault};

			font-size: 0.75rem;

			outline: 0;

			color: ${({ theme }) => theme.gray1};

			border: 0;
			font: inherit;

			::placeholder {
				color: ${({ theme }) => theme.gray4};
				opacity: 1;
			}
		}
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

		z-index: 999999;

		display: flex;
		align-items: center;
		justify-content: center;

		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

		gap: 2.5rem;

		height: 8vh;

		background: ${({ theme }) => theme.backgroundTertiary};
	}
`;

export const Logo = styled.img`
	background-color: #ffffff;

	padding: 0.5625rem 0.875rem;
	border-radius: 1000px;
	height: 2.125rem;
`;
