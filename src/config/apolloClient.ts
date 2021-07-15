import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://graphql.datocms.com/',
	cache: new InMemoryCache(),
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATO_ACCESS_TOKEN}`,
	},
});

export default client;
