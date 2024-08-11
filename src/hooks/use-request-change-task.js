import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase';

export const useRequestChangeTask = (setIsError) => {
	const [isTaskChanging, setIsTaskChanging] = useState(false);

	const requestChangeTask = (id, title) => {
		setIsTaskChanging(true);

		const currentTaskDbRef = ref(db, `todos/${id}`);

		update(currentTaskDbRef, { title })
			.catch(() => setIsError(true))
			.finally(() => setIsTaskChanging(false));
	};
	return {
		isTaskChanging,
		requestChangeTask,
	};
};
