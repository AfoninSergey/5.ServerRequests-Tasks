import { useState, useRef } from 'react';
import {
	useRequestGetTasks,
	useRequestAddTask,
	useRequestChangeTask,
	useRequestDeleteTask,
	useSortingTasks,
} from './hooks';
import { tascksHandlers } from './handlers/tasksHandlers';
import { debounceFn } from './utils/debounce';
import styles from './App.module.css';

export const App = () => {
	const [todoList, setTodoList] = useState({});
	const [searchingTodoList, setSearchingTodoList] = useState({});
	const [newTaskValue, setNewtaskValue] = useState('');
	const [isError, setIsError] = useState(false);
	const [isSearchingTodoListFlag, setIsSearchingTodoListFlag] = useState(false);
	const searchInputRef = useRef(null);

	//user-hooks___________________________________
	const { isTasksloading, requestGetTasks } = useRequestGetTasks(setTodoList);
	const { isTasksSorted, sortingTasks, cancelSortingTasks, setIsTasksSorted } =
		useSortingTasks(todoList, setTodoList, requestGetTasks);
	const { isEmpty, isTaskCreating, requestAddTask } = useRequestAddTask(
		newTaskValue,
		setNewtaskValue,
		setIsError,
		setIsTasksSorted,
	);
	const { isTaskChanging, requestChangeTask } = useRequestChangeTask(setIsError);
	const { isTaskDeleting, requestDeleteTask } = useRequestDeleteTask(
		setIsError,
		searchInputRef,
	);

	//handlers________________________________
	const {
		onNewTaskChange,
		onCurrentTaskButtonChange,
		onCurrentTaskButtonDelete,
		onEmptyChangeTest,
	} = tascksHandlers(setNewtaskValue, requestChangeTask, requestDeleteTask);

	//debounce________________________________
	const onSearchValueChange = debounceFn(
		todoList,
		setSearchingTodoList,
		setIsSearchingTodoListFlag,
	);

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
							onClick={sortingTasks}
						>
							Сортировать по алфавиту
						</button>
					) : (
						<button
							className={styles.sortButton}
							type="button"
							onClick={cancelSortingTasks}
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
					) : (Object.keys(todoList).length === 0 &&
							Object.keys(searchingTodoList).length === 0) ||
					  (Object.keys(searchingTodoList).length === 0 &&
							isSearchingTodoListFlag) ? (
						<div className={styles.empty}>Список задач пуст (((</div>
					) : (
						<ul className={styles.tasksList}>
							{Object.entries(
								Object.keys(searchingTodoList).length === 0 &&
									!isSearchingTodoListFlag
									? todoList
									: searchingTodoList,
							).map(([id, { title }]) => (
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
