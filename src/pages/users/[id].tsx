import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Menu from '@components/Menu';
import { GithubUser } from 'src/types/GithubUser';
import capitalize from 'src/utils/capitalize';
import * as S from '@styles/pages/UserDetails';
import { getUser } from 'src/api';
import Box from '@components/Box';

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
				<Box>
					<Image
						src={user.avatar_url}
						width={360}
						height={360}
						blurDataURL={user.avatar_url}
						placeholder='blur'
					/>
					<h2>{user.login}</h2>
					<p>{user.bio}</p>
				</Box>
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
