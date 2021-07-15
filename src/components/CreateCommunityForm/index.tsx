import axios from 'axios';
import { useForm } from 'react-hook-form';

type FormData = {
	name: string;
	image: string;
};

export default function CreateCommunityForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	async function handleCreateCommunity(data: FormData) {
		await axios.post(
			'/api/communities/',
			{
				title: data.name,
				imageUrl: data.image,
				creatorSlug: 'miguelsndc',
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	return (
		<form onSubmit={handleSubmit(handleCreateCommunity)}>
			<div>
				<input
					type='text'
					placeholder='Qual vai ser o nome da sua comunidade ?'
					aria-label='Qual vai ser o nome da sua comunidade ?'
					{...register('name', { required: true })}
				/>
			</div>
			<div>
				<input
					type='url'
					placeholder='Coloque uma URL para usar de capa'
					aria-label='Coloque uma URL para usar de capa'
					{...register('image', { required: true })}
				/>
			</div>
			<button type='submit'>Criar comunidade</button>
		</form>
	);
}
