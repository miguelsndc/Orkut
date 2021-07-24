import Box from '@components/Box';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';
import { AiOutlineDislike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { PostType } from 'src/types/Post';

type PostProps = {
	post: PostType;
};

export default function Post({ post }: PostProps) {
	const createdAt = parseISO(String(post.createdAt));

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
							{hasLiked ? (
								<AiFillHeart size='1.4rem' color='#e0281b' />
							) : (
								<AiOutlineHeart size='1.4rem' />
							)}
							<span>{likes}</span>
						</button>
						<button className='dislikes' onClick={handleDislike}>
							<AiOutlineDislike size='1.4rem' />
							<span>{dislikes}</span>
						</button>
					</div>
					<Link href={`/posts/${post.id}`}>Responder</Link>
				</div>
			</Box>
		</Container>
	);
}
