import Image from 'next/image';
import Link from 'next/link';

import * as S from './styles';

type ProfileProps = {
	name: string;
	imageURL: string;
};

export default function CommunitySmall({ name, imageURL }: ProfileProps) {
	const title = name.length > 12 ? `${name.substr(0, 12).trim()}...` : name;

	return (
		<Link href={`/communities/${name}`}>
			<S.Wrapper>
				<Image src={imageURL} width={192} height={192} />
				<span>{title}</span>
			</S.Wrapper>
		</Link>
	);
}
