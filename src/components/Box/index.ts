import styled from 'styled-components';

const Box = styled.div`
	background: ${({ theme }) => theme.white};

	margin-bottom: 10px;
	padding: 1rem;

	border-radius: 8px;

	.boxLink {
		font-size: 0.875rem;
		font-weight: 800;
		color: ${({ theme }) => theme.primaryText};
		text-decoration: none;
	}

	.title {
		font-size: 2rem;
		font-weight: 400;
		margin-bottom: 1.25rem;
	}

	.subTitle {
		font-size: 1.125rem;
		font-weight: 400;
		margin-bottom: 1.25rem;
	}

	.smallTitle {
		font-size: 1rem;
		font-weight: 700;
		color: ${({ theme }) => theme.gray1};
		margin-bottom: 1.25rem;
	}

	hr {
		margin-top: 0.75rem;
		margin-bottom: 0.5rem;
		border-color: transparent;
		border-bottom-color: #ecf2fa;
	}

	input {
		width: 100%;

		background-color: ${({ theme }) => theme.gray5};
		color: ${({ theme }) => theme.gray1};

		padding: 0.875rem 1rem;
		margin-bottom: 0.875rem;

		border: 0;
		border-radius: 10000px;

		&::placeholder {
			color: ${({ theme }) => theme.gray1};
			opacity: 1;
		}
	}

	button {
		background-color: ${({ theme }) => theme.primaryElement};
		color: ${({ theme }) => theme.gray5};

		padding: 0.5rem 0.75rem;

		border: 0;
		border-radius: 10000px;
	}
`;

export default Box;
