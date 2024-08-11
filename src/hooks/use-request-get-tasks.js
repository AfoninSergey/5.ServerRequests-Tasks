import { useState, useEffect } from 'react';
import { TODOS_URL } from '../constants/todos-url';

export const useRequestGetTasks = (setIsError) => {
	const [todoList, setTodoList] = useState([]);
	const [isTasksloading, setIsTasksLoading] = useState(false);
	const [refreshTodoListFlag, setRefreshTodoListFlag] = useState(false);
	const refreshTodoList = () => setRefreshTodoListFlag(!refreshTodoListFlag);


	const requestGetTasks = (adress) => {
		setIsTasksLoading(true);

		fetch(adress)
			// fetch('')// Проверка ошибки
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => setTodoList(loadedTodos))
			.catch(() => setIsError(true))
			.finally(() => setIsTasksLoading(false));
	};

	useEffect(() => {
		requestGetTasks(TODOS_URL);
	}, [refreshTodoListFlag]);

	return {
		todoList,
		isTasksloading,
		requestGetTasks,
		refreshTodoList
	};
};
