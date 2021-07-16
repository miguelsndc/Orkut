import styled from 'styled-components';

const MainGrid = styled.main`
	width: 100%;
	max-width: 500px;

	gap: 0.875rem;

	margin: 0 auto;
	padding: 1rem;

	.profileArea {
		display: none;

		@media (min-width: 860px) {
			display: block;
		}
	}

	@media (min-width: 860px) {
		display: grid;
		max-width: 1100px;
		grid-template-areas: 'profileArea welcomeArea profileRelationsArea';
		grid-template-columns: 160px 1fr 230px;
	}
`;

export default MainGrid;
