import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { GithubUser } from 'src/types/GithubUser';
import api from 'src/services/api';
import ProfileSidebar from '@components/ProfileSidebar';
import { Container } from '@styles/pages/FriendList';

type FriendDetailsProps = GithubUser;

export default function FriendDetails({ login }: FriendDetailsProps) {
	return (
		<Container>
			<ProfileSidebar user={login} />
			<div></div>
		</Container>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({
	params,
}: GetStaticPropsContext) => {
	const { name } = params;

	const { data } = await api.get<GithubUser>(`/users/${name}`);

	return {
		props: data,
		revalidate: 60 * 60 * 12,
	};
};
