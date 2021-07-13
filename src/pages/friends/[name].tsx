import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { GithubUser } from 'src/types/GithubUser';
import api from 'src/services/api';

type FriendDetailsProps = GithubUser;

export default function FriendDetails(props: FriendDetailsProps) {
	console.log(props);

	return <div>{props.bio}</div>;
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
