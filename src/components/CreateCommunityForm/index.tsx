import { useForm } from 'react-hook-form';

type FormData = {
	name: string;
	image: string;
};

type createCommunityProps = {
	image: string;
	title: string;
};

type CreateCommunityFormProps = {
	onCreate: ({ image, title }: createCommunityProps) => void;
};

export default function CreateCommunityForm({
	onCreate,
}: CreateCommunityFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	function handleCreateCommunity(data: FormData) {
		onCreate({
			image: data.image,
			title: data.name,
		});
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
