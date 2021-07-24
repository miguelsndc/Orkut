import Image from 'next/image';
import Link from 'next/link';

import * as S from './styles';

type ProfileProps = {
	name: string;
	imageURL: string;
};

export default function CommunitySmall({ name, imageURL }: ProfileProps) {
	return (
		<Link href={`/communities/${name}`}>
			<S.Wrapper>
				<Image src={imageURL} width={192} height={192} />
				<span>{name}</span>
			</S.Wrapper>
		</Link>
	);
}
