import { useState } from 'react';
import { TODOS_URL } from '../constants/todos-url';

export const useRequestSortingTasks = (requestGetTasks) => {
	const [isTasksSorted, setIsTasksSorted] = useState(false);

	const requestSortingTasks = () => {
		requestGetTasks(`${TODOS_URL}?_sort=title`);
		setIsTasksSorted(true);
	};
	const requestСancelSortingTasks = () => {
		requestGetTasks(TODOS_URL);
		setIsTasksSorted(false);
	};
	return {
		isTasksSorted,
		requestSortingTasks,
		requestСancelSortingTasks
	}
}