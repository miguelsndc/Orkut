import Image from 'next/image';
import Link from 'next/link';

type ProfileProps = {
	name: string;
	imageURL: string;
};

import * as S from './styles';

export default function Profile({ name, imageURL }: ProfileProps) {
	return (
		<Link href={`/users/${name}`}>
			<S.Wrapper>
				<Image
					src={imageURL}
					layout='fill'
					objectFit='cover'
					placeholder='blur'
					blurDataURL={imageURL}
				/>
				<span>{name}</span>
				<div className='overlay' />
			</S.Wrapper>
		</Link>
	);
}
