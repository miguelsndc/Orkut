import Box from '@components/Box';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';
import { IoThumbsDownSharp, IoThumbsUpSharp } from 'react-icons/io5';

import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';

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
	likes: number;
	dislikes: number;
};

type PostProps = {
	post: Post;
};
export default function Post({ post }: PostProps) {
	const createdAt = parseISO(post.createdAt);
	const formattedDate = format(createdAt, "dd 'de' MMMM', às ' HH:mm'h'", {
		locale: PTBR,
	});

	const [likes, setLikes] = useState(post.likes);
	const [dislikes, setDislikes] = useState(post.dislikes);
	const [hasLiked, setHasLiked] = useState(false);
	const [hasDisliked, setHasDisliked] = useState(false);

	function handleLike() {
		if (!hasLiked) {
			setLikes(prevLikes => prevLikes + 1);
			setHasLiked(true);
		} else {
			setLikes(prevLikes => prevLikes - 1);
			setHasLiked(false);
		}
	}

	function handleDislike() {
		if (!hasDisliked) {
			setDislikes(prevDislikes => prevDislikes + 1);
			setHasDisliked(true);
		} else {
			setDislikes(prevDislikes => prevDislikes - 1);
			setHasDisliked(false);
		}
	}

	return (
		<Container>
			<Box>
				<div className='author'>
					<Image src={post.author.picture} width={128} height={128} />
					<div>
						<h4>{post.author.name}</h4>
						<span>{formattedDate}</span>
					</div>
				</div>
				<hr />
				<p>{post.content}</p>
				<hr />
				<div className='options'>
					<div className='wrapper'>
						<button className='likes' onClick={handleLike}>
							<IoThumbsUpSharp />
							<span>{likes}</span>
						</button>
						<button className='dislikes' onClick={handleDislike}>
							<IoThumbsDownSharp />
							<span>{dislikes}</span>
						</button>
					</div>
					<Link href={`/posts/${post.id}`}>Responder</Link>
				</div>
			</Box>
		</Container>
	);
}
