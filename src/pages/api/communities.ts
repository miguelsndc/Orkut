import { NextApiRequest, NextApiResponse } from 'next';

import { SiteClient } from 'datocms-client';

export default async function requestHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const TOKEN = process.env.NEXT_PUBLIC_DATO_ACCESS_TOKEN;

		const client = new SiteClient(TOKEN);
		const ModelId = '967627';

		const record = await client.items.create({
			itemType: ModelId,
			title: req.body.title,
			imageUrl: req.body.imageUrl,
			creatorSlug: req.body.creatorSlug,
		});

		res.json({
			record,
		});

		return;
	}

	res.status(404).json({
		message: `This service does not support ${req.method} Requests`,
	});
}
