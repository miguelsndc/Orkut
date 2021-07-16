import Box from '@components/Box';
import Image from 'next/image';
import { Container } from './styles';

import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';

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
	const createdAt = parseISO(post.createdAt);
	const formattedDate = format(createdAt, "dd 'de' MMMM', às ' HH:mm'h'", {
		locale: PTBR,
	});

	return (
		<Container>
			<Box>
				<div className='author'>
					<Image
						src='https://github.com/miguelsndc.png'
						placeholder='blur'
						blurDataURL='https://github.com/miguelsndc.png'
						width={128}
						height={128}
					/>
					<div>
						<h4>{post.author}</h4>
						<span>{formattedDate}</span>
					</div>
				</div>
				<hr />
				<p>{post.content}</p>
			</Box>
		</Container>
	);
}
