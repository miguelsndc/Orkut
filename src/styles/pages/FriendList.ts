import styled from 'styled-components';

export const Container = styled.main`
	margin: 0 auto;
	display: grid;
	gap: 1rem;
	padding: 1rem;
	max-width: 500px;
	align-items: start;

	@media (min-width: 860px) {
		max-width: 1000px;
	}

	.path {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		button {
			max-width: 200px;
		}

		@media (min-width: 860px) {
			gap: 0;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		a {
			color: ${({ theme }) => theme.primaryElement};
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
		background: ${({ theme }) => theme.gray5};

		h3 {
			color: ${({ theme }) => theme.primaryElement};
			font-weight: 500;
			line-height: 1.4;
			cursor: pointer;
			font-size: 1rem;

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
			min-width: 56px;
			background: ${({ theme }) => theme.gray4};
			height: 56px;
		}

		&:nth-child(odd) {
			background: ${({ theme }) => theme.backgroundDefault};
		}
	}

	@media (min-width: 500px) {
		tbody tr {
			gap: 2rem;

			h3 {
				font-size: normal;
			}

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
