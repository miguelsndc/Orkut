import Menu from '@components/Menu';
import Post from '@components/Post';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getPost } from 'src/api';
import { PostType } from 'src/types/Post';

type PostDetailsProps = PostType;

export default function PostDetails(post: PostDetailsProps) {
	return (
		<>
			<Head>
				<title>Alurakut | {post.content.substr(0, 30)}</title>
			</Head>
			<Menu />
			{/* <Post post={post} /> */}
			<div>
				<h1>To fazendo ainda cara calma</h1>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	const { id } = ctx.params;

	const data = await getPost(id);

	return {
		props: data,
	};
};
