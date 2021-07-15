module.exports = {
	webpack: config => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: 'graphql-tag/loader',
		});

		return config;
	},
	webpackDevMiddleware: config => config,
	images: {
		domains: [
			'github.com',
			'avatars.githubusercontent.com',
			'pbs.twimg.com',
			'i.pinimg.com',
		],
	},
};
