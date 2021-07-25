import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Menu from '@components/Menu';
import { GithubUser } from 'src/types/GithubUser';
import capitalize from 'src/utils/capitalize';
import * as S from '@styles/pages/UserDetails';
import { getUser } from 'src/api';

type FriendDetailsProps = {
	user: GithubUser;
};

export default function UserDetails({ user }: FriendDetailsProps) {
	return (
		<>
			<Head>
				<title>{capitalize(user.name || user.login)} | Alurakut</title>
			</Head>
			<Menu />
			<S.Container>
				{/* <Image
					src={user.avatar_url}
					width={192}
					height={192}
					blurDataURL={user.avatar_url}
					placeholder='blur'
				/> */}
				<p>{user.login}</p>
				<h1>EM CONSTRUÇÃO</h1>
			</S.Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
}: GetServerSidePropsContext) => {
	const { id } = params;

	try {
		const response = await getUser(id, {
			headers: {
				Authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
			},
		});

		return {
			props: {
				user: response.data,
			},
		};
	} catch (error) {
		switch (error.request.res.statusCode) {
			case 404:
				return {
					redirect: {
						destination: '/404',
						permanent: false,
					},
				};
		}
	}

	return { props: {} as never };
};
