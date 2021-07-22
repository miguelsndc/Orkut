import styled from 'styled-components';

const Box = styled.div`
	background: ${({ theme }) => theme.backgroundTertiary};

	margin-bottom: 10px;
	padding: 1rem;

	border-radius: 8px;

	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

	.boxLink {
		font-size: 0.875rem;
		font-weight: 800;
		color: ${({ theme }) => theme.gray1};
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

		span {
			color: ${({ theme }) => theme.primaryElement};
		}
	}
	.profile-picture {
		border-radius: 8px;
	}

	.profile-name a {
		color: ${({ theme }) => theme.primaryElement};

		font-size: 1rem;
		font-weight: 500;
		text-decoration: none;
	}
	hr {
		margin-top: 0.75rem;
		margin-bottom: 0.5rem;
		border-color: transparent;
		border-bottom-color: ${({ theme }) => theme.gray5};
	}

	input {
		width: 100%;

		background-color: ${({ theme }) => theme.gray5};
		color: ${({ theme }) => theme.gray1};

		padding: 0.875rem 1rem;
		margin-bottom: 0.875rem;

		border: 0;
		border-radius: 8px;

		font: inherit;

		&::placeholder {
			color: ${({ theme }) => theme.gray1};
			opacity: 1;
		}
	}

	button {
		background-color: ${({ theme }) => theme.primaryElement};
		color: ${({ theme }) => theme.backgroundDefault};

		padding: 0.5rem 0.75rem;

		border: 0;
		border-radius: 10000px;

		font: inherit;
		cursor: pointer;

		transition: filter 0.2s;

		&:hover {
			filter: brightness(0.9);
		}
	}
`;

export default Box;
