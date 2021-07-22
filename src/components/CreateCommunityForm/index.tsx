import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import * as S from './styles';
import { useDropzone } from 'react-dropzone';
import { useAuth } from 'src/hooks/useAuth';

type FormData = {
	name: string;
};

const allowedTypes = ['image/jpeg', 'image/png'];

export default function CreateCommunityForm() {
	const { user } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
		useDropzone({
			multiple: false,
			maxFiles: 1,
			accept: allowedTypes.join(', '),
		});

	async function handleCreateCommunity(data: FormData) {
		const { name } = data;
		const file = acceptedFiles[0];

		if (!file || !allowedTypes.includes(file.type)) return;

		const path = 'path to file';

		toast.promise(
			axios.post(
				'/api/communities/',
				{
					title: name,
					poster: path,
					author: {
						name: user.name,
						picture: user.picture,
						githubId: user.uid,
					},
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			),
			{
				loading: 'Criando Comunidade...',
				success: <b>Comunidade Criada com Sucesso!</b>,
				error: <b>Houve um erro ao criar a comunidade</b>,
			}
		);
	}

	const AcceptedFileItems = acceptedFiles.map(file => {
		const filePreviewUrl = URL.createObjectURL(file);
		return (
			<img src={filePreviewUrl} key={file.name} className='image-preview' />
		);
	});

	return (
		<S.Form onSubmit={handleSubmit(handleCreateCommunity)}>
			<div>
				<label htmlFor='name'>Nome da Comunidade: </label>
				<input
					id='name'
					type='text'
					placeholder='Qual vai ser o nome da sua comunidade ?'
					aria-label='Qual vai ser o nome da sua comunidade ?'
					{...register('name', { required: true })}
				/>
			</div>
			<div>
				<S.Dropzone {...getRootProps()} dragActive={isDragActive}>
					<input {...getInputProps()} />
					<h3>Arraste e solte uma Imagem</h3>
					<div className='separator'>OU</div>
					<button>Abrir Arquivos</button>
				</S.Dropzone>
				<div className='preview'>{AcceptedFileItems}</div>
			</div>
			<button type='submit'>Criar comunidade</button>
		</S.Form>
	);
}
