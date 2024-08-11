import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTasks = (setTodoList) => {

	const [isTasksloading, setIsTasksLoading] = useState(false);

	const requestGetTasks = () => {
		setIsTasksLoading(true); //проверить потом

		const todosDbRef = ref(db, 'todos');

		return onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			setTodoList(loadedTodos);
			setIsTasksLoading(false);
		});
	};

	useEffect(() => {
		requestGetTasks();
	}, []);

	return {
		isTasksloading,
		requestGetTasks
	};
};
