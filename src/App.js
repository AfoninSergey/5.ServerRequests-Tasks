//npm run server
import { useState, useRef } from 'react';
import {
	useRequestGetTasks,
	useRequestAddTask,
	useRequestChangeTask,
	useRequestDeleteTask,
	useRequestSortingTasks,
} from './hooks';
import { tascksHandlers } from './handlers/tasksHandlers';
import { debounceFn } from './utils/debounce';
import styles from './App.module.css';

export const App = () => {
	const [newTaskValue, setNewtaskValue] = useState('');
	const [isError, setIsError] = useState(false);
	const searchInputRef = useRef(null);

	//user-hooks___________________________________
	const { todoList, isTasksloading, requestGetTasks, refreshTodoList } =
		useRequestGetTasks(setIsError);
	const { isEmpty, isTaskCreating, requestAddTask } = useRequestAddTask(
		newTaskValue, setNewtaskValue, setIsError, refreshTodoList
	);
	const { isTaskChanging, requestChangeTask } = useRequestChangeTask(setIsError);
	const { isTaskDeleting, requestDeleteTask } = useRequestDeleteTask(
		setIsError, searchInputRef, refreshTodoList
	);
	const { isTasksSorted, requestSortingTasks, requestСancelSortingTasks } =
		useRequestSortingTasks(requestGetTasks);

	//handlers________________________________
	const {
		onNewTaskChange,
		onCurrentTaskButtonChange,
		onCurrentTaskButtonDelete,
		onEmptyChangeTest,
	} = tascksHandlers(setNewtaskValue, requestChangeTask, requestDeleteTask);

	//debounce________________________________
	const onSearchValueChange = debounceFn(requestGetTasks);

	return (
		<div className={styles.app}>
			<header>
				<h1>Список задач</h1>
				<form className={styles.newTaskForm} onSubmit={requestAddTask}>
					<input
						className={`${styles.newTaskInput} ${isEmpty ? styles.fillIn : ''}`}
						type="text"
						placeholder="Ввести новую задачу . . ."
						value={newTaskValue}
						onChange={onNewTaskChange}
					/>
					<button
						disabled={isTaskCreating}
						className={styles.newTaskButton}
						type="submit"
					>
						Добавить
					</button>
				</form>
				<div className={styles.sortBlock}>
					{!isTasksSorted ? (
						<button
							className={styles.sortButton}
							type="button"
							onClick={requestSortingTasks}
						>
							Сортировать по алфавиту
						</button>
					) : (
						<button
							className={styles.sortButton}
							type="button"
							onClick={requestСancelSortingTasks}
						>
							Отменить сортировку
						</button>
					)}
					<input
						ref={searchInputRef}
						className={styles.sortTask}
						type="text"
						placeholder="Поиск задачи"
						onChange={({ target: { value } }) =>
							onSearchValueChange(value)
						}
					/>
				</div>
			</header>

			<main>
				<section className={styles.tasksBlock}>
					<h2>Задачи:</h2>
					{isTasksloading ? (
						<div className={styles.loader}></div>
					) : isError ? (
						<div className={styles.error}>
							Произошла ошибка :(( Перезагрузите страницу!
						</div>
					) : todoList.length === 0 ? (
						<div className={styles.empty}>Список задач пуст (((</div>
					) : (
						<ul className={styles.tasksList}>
							{todoList.map(({ id, title }) => (
								<li key={id} className={styles.task}>
									<div className={styles.task_content}>
										<input
											id={id}
											readOnly
											type="text"
											name="task"
											placeholder={title}
											onChange={onEmptyChangeTest}
										/>
									</div>
									<div className={styles.task_actions}>
										<button
											disabled={
												isTaskCreating ||
												isTaskChanging ||
												isTaskDeleting
											}
											type="button"
											className={styles.edit}
											onClick={onCurrentTaskButtonChange}
											data-edit="change"
										>
											Изменить
										</button>
										<button
											disabled={
												isTaskCreating ||
												isTaskChanging ||
												isTaskDeleting
											}
											type="button"
											className={styles.delete}
											onClick={onCurrentTaskButtonDelete}
										>
											Удалить
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</section>
			</main>
		</div>
	);
};
