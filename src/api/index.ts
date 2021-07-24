import { AxiosRequestConfig } from 'axios';
import api from 'src/services/api';
import { firestore, firebase } from 'src/services/firebase/config';
import { Community } from 'src/types/Community';
import { Follower } from 'src/types/Follower';
import { GithubUser } from 'src/types/GithubUser';
import { PostType } from 'src/types/Post';

type DocRef =
	firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export const getPosts = (): Promise<PostType[]> =>
	new Promise(resolve => {
		firestore
			.collection('posts')
			.get()
			.then(querySnapshot => {
				const documents = querySnapshot.docs.map(doc => doc.data() as PostType);
				resolve(documents);
			});
	});

export const createPost = (newPost: PostType): Promise<void> =>
	new Promise((resolve, reject) => {
		firestore
			.collection('posts')
			.doc(newPost.id)
			.set(newPost)
			.then(() => resolve())
			.catch(error => reject(error));
	});

export const getFollowers = async (
	githubUserId: string,
	config?: AxiosRequestConfig
) => await api.get<Follower[]>(`/user/${githubUserId}/followers`, config);

export const getUser = async (
	id: string | string[],
	config?: AxiosRequestConfig
) => await api.get<GithubUser>(`/user/${id}`, config);

export const getCommunities = (): Promise<Community[]> =>
	new Promise(resolve => {
		firestore
			.collection('communities')
			.get()
			.then(querySnapshot => {
				const documents = querySnapshot.docs.map(
					doc => doc.data() as Community
				);
				resolve(documents);
			});
	});

export const createCommunity = (newCommunity: Community): Promise<DocRef> =>
	new Promise(resolve => {
		firestore
			.collection('communities')
			.add(newCommunity)
			.then(docRef => resolve(docRef));
	});

export const like = async (postId: string) =>
	new Promise((resolve, reject) => {
		firestore
			.collection('posts')
			.doc(postId)
			.update({
				like: 2,
			})
			.then(() => resolve('Document updated successfully'))
			.catch(error => reject(error));
	});

export const dislike = async (postId: string) =>
	new Promise((resolve, reject) => {
		firestore
			.collection('posts')
			.doc(postId)
			.update({
				dislike: 2,
			})
			.then(() => resolve('Document updated successfully'))
			.catch(error => reject(error));
	});
