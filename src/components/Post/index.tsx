import Box from '@components/Box';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from './styles';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { parseISO, format } from 'date-fns';
import PTBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { PostType } from 'src/types/Post';
import { useMutation } from 'react-query';
import { togglelike } from 'src/api';

type PostProps = {
	post: PostType;
	showDetails?: boolean;
};

export default function Post({ post }: PostProps) {
	const createdAt = parseISO(String(post.createdAt));

	const formattedDate = format(createdAt, "dd 'de' MMMM', às ' HH:mm'h'", {
		locale: PTBR,
	});

	const [likes, setLikes] = useState(post.likes);
	const [hasLiked, setHasLiked] = useState(false);

	const likeMutation = useMutation(
		(data: { postId: string; currentLikes: number; hasLiked: boolean }) =>
			togglelike(data.postId, data.currentLikes, data.hasLiked)
	);

	function handleToggleLike() {
		if (hasLiked) {
			setLikes(likes - 1);
			setHasLiked(false);
			likeMutation.mutate({
				currentLikes: likes,
				postId: post.id,
				hasLiked: true,
			});
		} else {
			setHasLiked(true);
			setLikes(likes + 1);
			likeMutation.mutate({
				currentLikes: likes,
				postId: post.id,
				hasLiked: false,
			});
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
						<button className='likes' onClick={handleToggleLike}>
							{hasLiked ? (
								<AiFillHeart size='1.4rem' color='#e0281b' />
							) : (
								<AiOutlineHeart size='1.4rem' />
							)}
							<span>{likes}</span>
						</button>
					</div>
					<div></div>
				</div>
			</Box>
		</Container>
	);
}
