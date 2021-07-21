import Box from '@components/Box';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';

import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';
import { useAuth } from 'src/hooks/useAuth';

type Post = {
	id: string;
	content: string;
	author: string;
	createdAt: string;
};

type PostProps = {
	post: Post;
};
export default function Post({ post }: PostProps) {
	const { user } = useAuth();

	const createdAt = parseISO(post.createdAt);
	const formattedDate = format(createdAt, "dd 'de' MMMM', às ' HH:mm'h'", {
		locale: PTBR,
	});

	return (
		<Container>
			<Box>
				<div className='author'>
					{user && (
						<Image
							src={user.photo}
							placeholder='blur'
							blurDataURL={user.photo}
							width={128}
							height={128}
						/>
					)}
					<div>
						<h4>{post.author}</h4>
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
