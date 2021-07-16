import styled from 'styled-components';

export const Wrapper = styled.li`
	display: flex;
	align-items: center;
	position: relative;

	border-radius: 8px;
	margin: 0.7rem 0;
	padding: 0.35rem;
	cursor: pointer;

	transition: all 0.2s;

	&:hover {
		background: ${({ theme }) => theme.gray5};

		span {
			color: ${({ theme }) => theme.primaryElement};
		}
	}

	span {
		padding: 0.35rem;

		color: ${({ theme }) => theme.gray2};
		font-weight: 500;

		transition: all 0.2s;

		text-overflow: ellipsis;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
`;
