import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { firebaseAdmin } from 'src/services/firebase/adminConfig';
import CreateCommunityForm from '@components/CreateCommunityForm';
import * as S from '@styles/pages/FriendList';
import nookies from 'nookies';
import Box from '@components/Box';
import Menu from '@components/Menu';

export default function newCommunity() {
	return (
		<>
			<Head>
				<title>Nova Comunidade | Alurakut</title>
			</Head>
			<Menu />
			<S.Container>
				<Box>
					<h2>Criar nova Comunidade</h2>
					<CreateCommunityForm />
				</Box>
			</S.Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	try {
		const cookies = nookies.get(ctx);

		if (!cookies.token) {
			throw new Error('No token was found');
		}

		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		};
	}

	return {
		props: {},
	};
};
