import { GithubUser } from 'src/types/GithubUser';
import api from 'src/services/api';
import ProfileSidebar from '@components/ProfileSidebar';
import { Container } from '@styles/pages/FriendList';
import Spinner from '@components/Spinner';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type FriendDetailsProps = {
	user: GithubUser;
};

export default function FriendDetails({ user }: FriendDetailsProps) {
	return (
		<Container>
			<div>PÁGINA EM CONSTRUÇÃO</div>
		</Container>
	);
}

// export const getServerSideProps: GetServerSideProps = async ({
// 	params,
// }: GetServerSidePropsContext) => {
// 	const { name } = params;

// 	const { data } = await api.get<GithubUser>(`/users/${name}`);

// 	return {
// 		props: {
// 			user: data,
// 		},
// 	};
// };
