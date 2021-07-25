import { NextApiRequest, NextApiResponse } from 'next';
import api from 'src/services/api';
import { Follower } from 'src/types/Follower';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userId = req.body.uid;
	const config = req.body.config;
	const page = req.body.page || 1;
	const ResultsPerPage = req.body.resultsPerPage || 20;

	if (!userId) {
		res.json({
			message: 'User id must be defined',
		});
	}

	if (req.method !== 'POST') {
		res.json({
			message: 'Method not supported',
		});
	}

	try {
		const { data } = await api.get<Follower[]>(
			`/user/${userId}/followers?page=${page}&per_page=${ResultsPerPage}`,
			{
				...config,
				headers: {
					Authorization: `token ${process.env.GITHUB_ACESS_TOKEN}`,
				},
			}
		);

		res.json({
			hasMore: data.length > 0 || data.length > ResultsPerPage,
			nextPage: page + 1,
			data,
		});
	} catch (error) {
		res.end();
	}
};
