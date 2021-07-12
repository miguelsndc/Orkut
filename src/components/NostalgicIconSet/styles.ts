import styled from 'styled-components';

export const List = styled.ul`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	margin-top: 2rem;
	list-style: none;

	li {
		display: grid;
		grid-template-areas:
			'title title'
			'number number';

		font-size: 0.875rem;
		color: #5a5a5a;

		&:not(:last-child) {
			margin-right: 5px;
		}

		.NostalgicIconSet__title {
			display: block;
			font-style: italic;
		}

		.NostalgicIconSet__number {
			min-width: 15px;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.NostalgicIconSet__iconSample {
				margin-right: 7px;
			}
		}
	}
`;
