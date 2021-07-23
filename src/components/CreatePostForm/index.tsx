import { useForm } from 'react-hook-form';
import * as S from './styles';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { v4 as generateUniqueId } from 'uuid';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from '@components/Button';
import { useMutation } from 'react-query';
import { createPost } from 'src/api';
import { PostType } from 'src/types/Post';

type FormData = {
	content: string;
};

type CreatePostFormProps = {
	onUiUpdate: () => void;
};

export default function CreatePostForm({ onUiUpdate }: CreatePostFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>();

	const { user } = useAuth();

	const mutation = useMutation((newPost: PostType) => createPost(newPost));

	async function handleCreatePost(data: FormData) {
		await toast.promise(
			mutation.mutateAsync({
				author: {
					name: user.name,
					picture: user.picture,
					githubId: user.uid,
				},
				content: data.content,
				createdAt: new Date().toISOString(),
				likes: 0,
				dislikes: 0,
				id: generateUniqueId(),
			}),
			{
				loading: 'Postando...',
				success: <b>Post Criado!</b>,
				error: <b>Não pude criar o Post.</b>,
			}
		);

		reset({
			content: '',
		});

		onUiUpdate();
	}

	return (
		<S.Form onSubmit={handleSubmit(handleCreatePost)}>
			<div className='profile-review'>
				<Image
					src='https://github.com/miguelsndc.png'
					width={192}
					height={192}
				/>
				<TextareaAutosize
					className='text'
					placeholder='O que você está pensando ?'
					{...register('content', { required: true, maxLength: 500 })}
				/>
			</div>

			{errors.content?.type === 'required' && (
				<S.Error>A Discussão é Obrigatória</S.Error>
			)}
			{errors.content?.type === 'maxLength' && (
				<S.Error>A discussão deve ter no máximo 500 Caracteres</S.Error>
			)}

			<hr />

			<Button type='submit'>Postar</Button>
		</S.Form>
	);
}
