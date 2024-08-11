import { useState } from 'react';
import { TODOS_URL } from '../constants/todos-url';

export const useRequestChangeTask = (setIsError) => {
	const [isTaskChanging, setIsTaskChanging] = useState(false);

	const requestChangeTask = (id, title) => {
		setIsTaskChanging(true);

		fetch(`${TODOS_URL}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'Application/json; charset=UTF-8',
			},
			body: JSON.stringify({ title }),
		})
			.catch(() => setIsError(true))
			.finally(() => setIsTaskChanging(false));
	};
	return {
		isTaskChanging,
		requestChangeTask,
	};
};
