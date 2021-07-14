import { GetServerSideProps, GetServerSidePropsContext } from 'next';
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

export const getServerSideProps: GetServerSideProps = async ({
	params,
}: GetServerSidePropsContext) => {
	const { name } = params;

	const { data } = await api.get<GithubUser>(`/users/${name}`);

	return {
		props: data,
	};
};
