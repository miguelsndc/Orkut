import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;
	min-width: 100%;
	max-width: 100%;

	.author {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		div span {
			color: ${({ theme }) => theme.gray2};
			font-size: 0.875rem;
		}

		img {
			width: 32px;
			height: 32px;

			border-radius: 50%;
		}

		h4 {
			font-weight: 500;
		}
	}

	p {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	h2 {
		margin-top: 0.25rem;
		color: ${({ theme }) => theme.gray1};
		margin-bottom: 1rem;
	}
`;
