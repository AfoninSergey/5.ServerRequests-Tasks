import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAVlmoh0K8MhUYtVtCO5nU5bE-A2b-4UPs',
	authDomain: 'serverrequestsproject.firebaseapp.com',
	projectId: 'serverrequestsproject',
	storageBucket: 'serverrequestsproject.appspot.com',
	messagingSenderId: '1042539394200',
	appId: '1:1042539394200:web:4563393c299760db358ced',
	databaseURL: 'https://serverrequestsproject-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
