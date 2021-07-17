import { GithubUser } from 'src/types/GithubUser';
import api from 'src/services/api';
import ProfileSidebar from '@components/ProfileSidebar';
import { Container } from '@styles/pages/FriendList';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Spinner from '@components/Spinner';

export default function FriendDetails() {
	const [user, setUser] = useState<GithubUser>();
	const router = useRouter();

	const { name } = router.query;

	useEffect(() => {
		api.get<GithubUser>(`/users/${name}`).then(({ data }) => {
			setUser(data);
		});
	}, []);

	return (
		<Container>
			{user ? <ProfileSidebar user={user.login} /> : <Spinner />}
			<div></div>
		</Container>
	);
}
