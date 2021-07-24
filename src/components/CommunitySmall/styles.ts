import styled from 'styled-components';

export const Wrapper = styled.li`
	display: flex;
	align-items: center;
	position: relative;

	border-radius: 8px;
	margin: 0.8rem 0;
	cursor: pointer;

	span {
		padding: 0.35rem;

		color: ${({ theme }) => theme.gray1};
		font-weight: 600;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 10px;
		background: ${({ theme }) => theme.gray4};
	}
`;
