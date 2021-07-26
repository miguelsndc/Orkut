import styled from 'styled-components';

export const Container = styled.main`
	display: block;
	margin: 3rem auto;
	max-width: 600px;
	text-align: center;

	img {
		width: 108px;
		height: 108px;
		border-radius: 8px;
	}

	h2 {
		margin-top: 0.5rem;
		color: ${({ theme }) => theme.gray1};
	}
	p {
		max-width: 45%;
		text-align: left;
		display: block;
		margin: 0.5rem auto;
	}

	@media (min-width: 860px) {
		img {
			width: 160px;
			height: 160px;
		}
	}
`;
