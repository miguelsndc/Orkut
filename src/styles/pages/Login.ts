import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;

	main {
		margin: 0 2rem;

		display: flex;
		align-items: center;
		flex-direction: column;
	}

	h1 {
		font-weight: 500;
	}

	button {
		display: flex;
		align-items: center;

		background: #262626;
		color: white;
		border: none;
		font: inherit;
		cursor: pointer;

		padding: 0.5rem 1rem;
		border-radius: 8px;

		font-weight: 500;

		svg {
			margin-right: 5px;
		}

		&,
		svg {
			transition: all 0.2s;
		}

		&:hover {
			background: #171717;
		}
	}
`;
