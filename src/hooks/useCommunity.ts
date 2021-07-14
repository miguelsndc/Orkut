import { useState } from 'react';

type createCommunityProps = {
	image: string;
	title: string;
};

type Community = {
	id: string;
	name: string;
	imageUrl: string;
};

export default function useCommunity() {
	const [communities, setCommunities] = useState<Community[]>([]);

	function createCommunity({ image, title }: createCommunityProps) {
		const newCommunity = {
			id: `${new Date().toISOString()} - ${Math.random()}`,
			name: title,
			imageUrl: image,
		};

		setCommunities(prevCommunities => {
			console.log([...prevCommunities, newCommunity]);
			return [...prevCommunities, newCommunity];
		});
	}

	return { communities, createCommunity };
}
