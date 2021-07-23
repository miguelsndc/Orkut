import Image from 'next/image';
import Link from 'next/link';
import * as S from './styles';

type ProfileProps = {
	name: string;
	imageURL: string;
};

export default function FriendSmall({ name, imageURL }: ProfileProps) {
	return (
		<Link href={`/users/${name}`}>
			<S.Wrapper>
				<Image
					src={imageURL}
					width={192}
					height={192}
					placeholder='blur'
					blurDataURL={imageURL}
				/>
				<span>{name}</span>
			</S.Wrapper>
		</Link>
	);
}
