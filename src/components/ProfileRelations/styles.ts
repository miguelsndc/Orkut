import styled from 'styled-components';

export const Wrapper = styled.li`
	position: relative;
	border-radius: 8px;
	height: 102px;

	span {
		display: inline-block;
		max-width: 90%;

		position: absolute;
		padding: 0.35rem;
		bottom: 7px;
		color: #fff;
		font-weight: 500;
		font-size: 0.725rem;
		z-index: 9;

		text-overflow: ellipsis;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	img {
		border-radius: 8px;
	}

	&:hover {
		.overlay {
			opacity: 0;
		}
	}

	.overlay {
		position: absolute;
		opacity: 0.3;
		background: #000;
		inset: 0;
		border-radius: 8px;
		transition: opacity 0.2s;
	}

	cursor: pointer;
`;
