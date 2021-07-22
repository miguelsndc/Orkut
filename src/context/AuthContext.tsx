import nookies from 'nookies';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { firebase, auth } from 'src/services/firebase/config';

type AuthProviderProps = {
	children: ReactNode;
};

type User = {
	name: string;
	email: string;
	picture: string;
	uid: string;
};

type AuthContextValue = {
	loginWithGithub(): Promise<void>;
	user: User | null;
};

const REFRESH_TOKEN_INTERVAL = 10 * 60 * 1000;

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	async function loginWithGithub() {
		const provider = new firebase.auth.GithubAuthProvider();

		try {
			const result = await auth.signInWithPopup(provider);

			const { user } = result;

			setUser({
				name: user.displayName,
				email: user.email,
				picture: user.photoURL,
				uid: user.uid,
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged(async user => {
			if (user) {
				const token = await user.getIdToken();
				setUser({
					name: user.displayName,
					email: user.email,
					picture: user.photoURL,
					uid: user.providerData[0].uid,
				});
				nookies.set(undefined, 'token', token, { path: '/' });
			} else {
				setUser(null);
				nookies.set(undefined, 'token', '', { path: '/' });
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			const user = firebase.auth().currentUser;

			if (user) await user.getIdToken(true);
		}, REFRESH_TOKEN_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	return (
		<AuthContext.Provider value={{ loginWithGithub, user }}>
			{children}
		</AuthContext.Provider>
	);
};
