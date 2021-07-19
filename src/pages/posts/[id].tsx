import { useQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';

import QUERY_POST_BY_ID from 'src/graphql/queries/postById.graphql';

export default function PostDetails() {
	const router = useRouter();
	const { id } = router.query;

	const { data, error, loading } = useQuery(QUERY_POST_BY_ID, {
		variables: { id },
	});

	if (data) console.log(data);

	return <div></div>;
}
