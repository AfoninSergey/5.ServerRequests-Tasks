import { useState } from 'react';
import { TODOS_URL } from '../constants/todos-url';

export const useRequestDeleteTask = (
	setIsError,
	searchInputRef,
	refreshTodoList,
) => {
	const [isTaskDeleting, setIsTaskDeleting] = useState(false);

	const requestDeleteTask = (id) => {
		setIsTaskDeleting(true);
		fetch(`${TODOS_URL}/${id}`, {
			method: 'DELETE',
		})
			.then(() => refreshTodoList())
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
