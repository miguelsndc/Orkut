import Image from 'next/image';
import Link from 'next/link';
import * as S from './styles';

type ProfileProps = {
	name: string;
	imageURL: string;
};

export default function FriendSmall({ name, imageURL }: ProfileProps) {
	const userName = name.length > 12 ? `${name.substr(0, 12)}...` : name;

	return (
		<Link href={`/users/${name}`}>
			<S.Wrapper>
				<Image src={imageURL} width={192} height={192} />
				<span>{userName}</span>
			</S.Wrapper>
		</Link>
	);
}
