import { firebase } from 'src/services/firebase/config';
import { Author } from './Author';

export type PostType = {
	id: string;
	content: string;
	author: Author;
	createdAt:
		| firebase.firestore.Timestamp
		| firebase.firestore.FieldValue
		| string
		| Date;
	likes: number;
};
