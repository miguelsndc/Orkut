import styled from 'styled-components';

export const Form = styled.form`
	.profile-review {
		display: flex;
		align-items: flex-start;
		gap: 0.35rem;

		span {
			display: block;
			font-weight: 500;
		}

		span:last-child {
			color: ${({ theme }) => theme.gray3};
			font-size: 0.875rem;
			margin-top: 2px;
		}
	}

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.text {
		width: 100%;

		word-wrap: break-word;
		resize: none;
		min-height: 86px;
		margin-top: 0.85rem;

		outline: none;
		border: none;
		padding: 0.35rem;
		font-family: inherit;
	}

	button {
		display: block;
		margin-left: auto;
		margin-top: 1rem;
		cursor: pointer;
	}
`;

export const Error = styled.span`
	display: block;
	font-weight: 500;
	color: red;

	margin-bottom: 1rem;
`;
