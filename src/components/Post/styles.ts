import styled from 'styled-components';

export const Container = styled.div`
	margin: 1rem 0;

	.profile {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		img {
			width: 32px;
			height: 32px;

			border-radius: 50%;
		}

		h4 {
			font-weight: 500;
		}
	}

	h2 {
		margin-top: 0.25rem;
		margin-bottom: 1rem;
	}
`;
