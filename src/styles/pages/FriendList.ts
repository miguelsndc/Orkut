import styled from 'styled-components';

export const Container = styled.main`
	margin: 0 auto;
	display: grid;
	gap: 1rem;
	padding: 1rem;
	max-width: 500px;
	align-items: start;

	.profile {
		display: none;
	}

	grid-template-columns: 1fr;

	@media (min-width: 860px) {
		max-width: 1100px;
		grid-template-columns: 160px 1fr;

		.profile {
			display: block;
		}
	}

	.path {
		a {
			color: ${({ theme }) => theme.primaryText};
			text-decoration: none;
			font-size: 1.125rem;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

export const Table = styled.table`
	border-radius: 8px;
	margin-top: 1.5rem;
	width: 100%;

	tbody tr {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: ${({ theme }) => theme.backgroundSecondary};

		h3 {
			color: ${({ theme }) => theme.primaryText};
			font-weight: 500;
			line-height: 1.4;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}

		span {
			display: none;
			font-size: 0.875rem;
		}

		img {
			border-radius: 50%;
			min-width: 64px;
			height: 64px;
		}

		&:nth-child(odd) {
			background: ${({ theme }) => theme.backgroundDefault};
		}
	}

	@media (min-width: 500px) {
		tbody tr {
			gap: 2rem;

			span {
				display: block;
			}
		}
	}

	@media (min-width: 860px) {
		tbody tr {
			display: flex;
			align-items: center;

			img {
				min-width: 92px;
				height: 92px;
			}
		}
	}
`;
