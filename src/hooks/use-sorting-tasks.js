import { useState } from 'react';

export const useSortingTasks = (todoList, setTodoList, requestGetTasks) => {
	const [isTasksSorted, setIsTasksSorted] = useState(false);

	const sortingTasks = () => {
		const sortedTodoList = Object.entries(todoList);
		sortedTodoList.sort((a, b) => {
			return a[1].title.localeCompare(b[1].title);
		});
		setTodoList(Object.fromEntries(sortedTodoList));
		setIsTasksSorted(true);
	};
	const cancelSortingTasks = () => {
		requestGetTasks();
		setIsTasksSorted(false);
	};
	return {
		isTasksSorted,
		sortingTasks,
		cancelSortingTasks,
		setIsTasksSorted
	};
};
