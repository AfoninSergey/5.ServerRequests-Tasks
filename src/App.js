import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [todoList, setTodoList] = useState([]);
	const [isloading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			fetch('https://jsonplaceholder.typicode.com/todos')
			// fetch('')// Проверка ошибки
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				console.log('Список дел загружен! Ответ сервера:', loadedTodos);
				setTodoList(loadedTodos);
			})
			.catch((error) => setIsError(true))
			.finally(() => setIsLoading(false));

		}, 1500);
	}, []);

	return (
		<div className={styles.app}>
			<h1>Список задач</h1>

			{isloading ? (
				<div className={styles.loader}></div>
			) : (
				(isError && <div className={styles.error}>Произошла ошибка :(( Перезагрузите страницу!</div>) ||
				todoList.map(({ id, title }) => (
					<div key={id} className={styles.task}>
						{title}
					</div>
				))
			)}
		</div>
	);
};
