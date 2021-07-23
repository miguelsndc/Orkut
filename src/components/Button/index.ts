import styled from 'styled-components'

export const Button = styled.button`
	background-color: ${({ theme }) => theme.primaryElement};
	color: ${({ theme }) => theme.backgroundDefault};

	padding: 0.5rem 0.75rem;

	border: 0;
	border-radius: 8px;

	font: inherit;
	cursor: pointer;

	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.9);
	}
`;