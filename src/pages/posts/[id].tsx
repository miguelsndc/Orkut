import { useRouter } from 'next/dist/client/router';

export default function PostDetails() {
	const router = useRouter();
	const { id } = router.query;

	return <div>PÁGINA EM CONSTRUÇÃO</div>;
}
