import styled from 'styled-components';

export const Wrapper = styled.div`
	a {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		font-size: 0.9rem;
		text-decoration: none;
		color: ${({ theme }) => theme.gray1};

		margin-bottom: 1rem;

		&:hover {
			&,
			svg {
				color: ${({ theme }) => theme.primaryElement};
			}
		}
	}

	&,
	svg {
		transition: all 0.2s;
	}

	svg {
		margin-right: 4px;
	}
`;
