import styled from 'styled-components';

type ContainerProps = {
	gridArea?: string;
};

export const GridItem = styled.div<ContainerProps>`
	grid-area: ${p => p.gridArea};
`;
