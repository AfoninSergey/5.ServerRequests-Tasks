import { useState } from 'react';
import { TODOS_URL } from '../constants/todos-url';

export const useRequestAddTask = (
	newTaskValue,
	setNewtaskValue,
	setIsError,
	refreshTodoList,
) => {
	const [isEmpty, setIsEmpty] = useState(false);
	const [isTaskCreating, setIsTaskCreating] = useState(false);

	const requestAddTask = (event) => {
		event.preventDefault();

		if (!newTaskValue) {
			setIsEmpty(true);
			setTimeout(() => {
				setIsEmpty(false);
			}, 700);
			return;
		}
		setIsTaskCreating(true);

		fetch(TODOS_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/json; charset=UTF-8',
			},
			body: JSON.stringify({ title: newTaskValue.trim() }),
		})
			.then(() => {
				refreshTodoList();
				setNewtaskValue('');
			})
			.catch(() => setIsError(true))
			.finally(() => setIsTaskCreating(false));
	};

	return {
		isEmpty,
		isTaskCreating,
		requestAddTask,
	};
};
