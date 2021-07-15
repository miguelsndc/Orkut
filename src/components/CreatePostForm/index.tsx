import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as S from './styles';

import toast from 'react-hot-toast';

type FormData = {
	title: string;
	content: string;
};

export default function CreatePostForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	async function handleCreatePost(data: FormData) {
		try {
			await axios.post('/api/posts', {
				title: data.title,
				author: 'miguelsndc',
				content: data.content,
			});

			toast.success('Post Adicionado!');
		} catch (error) {
			toast.error('Houve um Erro :(');
		}
	}

	return (
		<S.Form onSubmit={handleSubmit(handleCreatePost)}>
			<input
				type='text'
				placeholder='Título da Discussão'
				{...register('title', { required: true, maxLength: 50 })}
			/>

			{errors.title?.type === 'required' && (
				<S.Error>O Título é Obrigatório</S.Error>
			)}
			{errors.title?.type === 'maxLength' && (
				<S.Error>O título deve ter no máximo 50 Caracteres</S.Error>
			)}

			<textarea {...register('content', { required: true, maxLength: 500 })} />

			{errors.content?.type === 'required' && (
				<S.Error>A Discussão é Obrigatória</S.Error>
			)}
			{errors.content?.type === 'maxLength' && (
				<S.Error>A discussão deve ter no máximo 500 Caracteres</S.Error>
			)}

			<button type='submit'>Iniciar Discussão</button>
		</S.Form>
	);
}
