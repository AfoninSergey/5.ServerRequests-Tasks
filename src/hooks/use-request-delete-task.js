import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTask = (
	setIsError,
	searchInputRef,
) => {
	const [isTaskDeleting, setIsTaskDeleting] = useState(false);

	const requestDeleteTask = (id) => {
		setIsTaskDeleting(true);

		const currentTaskDbRef = ref(db, `todos/${id}`);

		remove(currentTaskDbRef)
			.catch(() => setIsError(true))
			.finally(() => {
				setIsTaskDeleting(false);
				searchInputRef.current.value = '';
			});
	};
	return {
		isTaskDeleting,
		requestDeleteTask,
	};
};
