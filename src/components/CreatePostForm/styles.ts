import styled from 'styled-components';

export const Form = styled.form`
	textarea {
		width: 100%;
		resize: none;
		min-height: 112px;

		border: 2px solid ${({ theme }) => theme.primaryElement};
		border-radius: 8px;
		padding: 0.35rem;
		font-family: inherit;

		&:focus,
		&:active {
			border-color: ${({ theme }) => theme.primaryElement};
		}
	}

	button {
		margin-top: 1rem;
		cursor: pointer;

		&:hover {
			filter: brightness(0.9);
		}
	}
`;

export const Error = styled.span`
	display: block;
	font-weight: 500;
	color: red;

	margin-bottom: 1rem;
`;
