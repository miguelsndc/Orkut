import styled from 'styled-components';

export const Wrapper = styled.section`
	text-align: center;
	padding: 2rem;

	h1 {
		color: ${({ theme }) => theme.gray1};
	}

	button {
		margin-top: 1rem;
	}
`;
