import styled from 'styled-components';

type ContainerProps = {
	gridArea?: string;
};

export const GridItem = styled.div<ContainerProps>`
	grid-area: ${p => p.gridArea};
`;

export const ProfileRelationsWrapper = styled.ul`
	list-style: none;

	a {
		color: ${({ theme }) => theme.primaryElement};
		text-decoration: none;
		font-weight: 600;

		&:hover {
			text-decoration: underline;
		}
	}
`;
