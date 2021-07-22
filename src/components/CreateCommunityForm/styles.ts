import styled from 'styled-components';

type DropzoneProps = {
	dragActive: boolean;
};

export const Form = styled.form`
	margin-top: 1rem;
	margin-bottom: 2rem;

	.image-preview {
		width: auto;
		max-height: 100px;
	}

	label {
		display: block;
		font-weight: 500;
		margin-bottom: 5px;
	}

	.preview {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1rem 0;
	}
`;

export const Dropzone = styled.div<DropzoneProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	background: ${({ theme }) => theme.gray5};

	border: 3px dashed
		${props =>
			props.dragActive ? props.theme.primaryElement : props.theme.gray4};

	border-radius: 8px;
	min-height: 200px;

	transition: all 0.2s;

	h3 {
		color: ${({ theme }) => theme.gray1};
	}

	.separator {
		width: 35%;
		font-size: 0.875rem;
		color: ${({ theme }) => theme.gray3};
		margin: 1.5rem 0;
		display: flex;
		align-items: center;

		&::before {
			content: '';
			flex: 1;
			height: 1px;
			background: ${({ theme }) => theme.gray3};
			margin-right: 1rem;
		}

		&::after {
			content: '';
			flex: 1;
			height: 1px;
			background: ${({ theme }) => theme.gray3};
			margin-left: 1rem;
		}
	}
`;
