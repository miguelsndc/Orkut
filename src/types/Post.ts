import { Author } from './Author';

export type PostType = {
	id: string;
	content: string;
	author: Author;
	createdAt: string;
	likes: number;
	dislikes: number;
};
