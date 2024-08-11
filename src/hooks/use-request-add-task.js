import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask = (
	newTaskValue,
	setNewtaskValue,
	setIsError,
	setIsTasksSorted,
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

		const todosDbRef = ref(db, 'todos');
		push(todosDbRef, { title: newTaskValue.trim() })
			.then(() => {
				setNewtaskValue('');
			})
			.catch(() => setIsError(true))
			.finally(() => {
				setIsTaskCreating(false);
				setIsTasksSorted(false);
			});
	};

	return {
		isEmpty,
		isTaskCreating,
		requestAddTask,
	};
};
