import Box from '@components/Box';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';

import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';

type Author = {
	name: string;
	picture: string;
	githubId: string;
};

type Post = {
	id: string;
	content: string;
	author: Author;
	createdAt: string;
};

type PostProps = {
	post: Post;
};
export default function Post({ post }: PostProps) {
	const createdAt = parseISO(post.createdAt);
	const formattedDate = format(createdAt, "dd 'de' MMMM', às ' HH:mm'h'", {
		locale: PTBR,
	});

	return (
		<Container>
			<Box>
				<div className='author'>
					<Image
						src={post.author.picture}
						placeholder='blur'
						blurDataURL={post.author.picture}
						width={128}
						height={128}
					/>
					<div>
						<h4>{post.author.name}</h4>
						<span>{formattedDate}</span>
					</div>
				</div>
				<hr />
				<p>{post.content}</p>
				<hr />
				<div className='options'>
					<Link href={`/posts/${post.id}`}>Responder</Link>
				</div>
			</Box>
		</Container>
	);
}
