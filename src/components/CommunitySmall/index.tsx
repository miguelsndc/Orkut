import Image from 'next/image';
import Link from 'next/link';

type ProfileProps = {
	name: string;
	imageURL: string;
};

import * as S from './styles';

export default function CommunitySmall({ name, imageURL }: ProfileProps) {
	return (
		<Link href={`/communities/${name}`}>
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
