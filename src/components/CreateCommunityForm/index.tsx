import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { v4 as generateUniqueId } from 'uuid';

import * as S from './styles';
import { useDropzone } from 'react-dropzone';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from '@components/Button';
import { storage } from 'src/services/firebase/config';
import { useMutation } from 'react-query';
import { Community } from 'src/types/Community';
import { createCommunity } from 'src/api';

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

	const mutation = useMutation((newCommunity: Community) =>
		createCommunity(newCommunity)
	);

	async function upload(file: File): Promise<string> {
		const storageRef = storage.ref();
		const fileRef = storageRef.child(`${Date.now()}${file.name}`);

		return new Promise((resolve, reject) => {
			const unsubscribe = fileRef.put(file).on(
				'state_changed',
				() => {},
				error => {
					toast.error('Houve um erro ao criar sua comunidade');
					reject(error);
				},
				async () => {
					const url = await fileRef.getDownloadURL();
					unsubscribe();
					resolve(url);
				}
			);
		});
	}

	async function handleCreateCommunity(data: FormData) {
		const { name } = data;
		const file = acceptedFiles[0];

		if (!file || !allowedTypes.includes(file.type)) return;

		toast.promise(
			new Promise(resolve => {
				upload(file).then(url => {
					mutation
						.mutateAsync({
							id: generateUniqueId(),
							title: name,
							poster: url,
							author: {
								name: user.name,
								picture: user.picture,
								githubId: user.uid,
							},
						})
						.then(docRef => resolve(docRef));
				});
			}),
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
					<Button>Abrir Arquivos</Button>
				</S.Dropzone>
				<div className='preview'>{AcceptedFileItems}</div>
			</div>
			<Button type='submit'>Criar comunidade</Button>
		</S.Form>
	);
}
