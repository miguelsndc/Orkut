import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as S from './styles';
import Image from 'next/image';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { useAuth } from 'src/hooks/useAuth';

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

	async function handleCreatePost(data: FormData) {
		try {
			await axios.post('/api/posts', {
				author: user.name,
				content: data.content,
			});

			toast.success('Post Adicionado!');

			reset({
				content: '',
			});

			onUiUpdate();
		} catch (error) {
			toast.error('Houve um Erro :(');
		}
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

			<button type='submit'>Postar</button>
		</S.Form>
	);
}
