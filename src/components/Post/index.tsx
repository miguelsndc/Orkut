import Box from '@components/Box';
import Image from 'next/image';
import { Container } from './styles';

type Post = {
	title: string;
	content: string;
	authorPicture: string;
};

type PostProps = {
	post: Post;
};
export default function Post({ post }: PostProps) {
	return (
		<Container>
			<Box>
				<div className='profile'>
					<Image
						src='https://github.com/miguelsndc.png'
						placeholder='blur'
						blurDataURL='https://github.com/miguelsndc.png'
						width={128}
						height={128}
					/>
					<h4>{post.authorPicture}</h4>
				</div>
				<hr />
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</Box>
		</Container>
	);
}
