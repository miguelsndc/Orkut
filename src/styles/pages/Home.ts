import styled from 'styled-components';

type ContainerProps = {
	gridArea?: string;
};

export const GridItem = styled.div<ContainerProps>`
	grid-area: ${p => p.gridArea};
`;

export const ProfileRelationsWrapper = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	list-style: none;
	gap: 0.5rem;
	max-height: 220px;
`;
