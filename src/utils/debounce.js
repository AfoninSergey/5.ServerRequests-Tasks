export const debounceFn = (todoList, setSearchingTodoList, isSearchingTodoListFlag) => {
	function debounce(func, wait) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), wait);
		};
	}

	function onSearchDebounceValueChange(value) {
		if (value.trim().length !== 0) {
			let searchingTodoList = Object.entries(todoList);
			isSearchingTodoListFlag(true)
			searchingTodoList = searchingTodoList.filter((todo) =>
				todo[1].title.toLowerCase().includes(value.trim().toLowerCase()),
			);
			setSearchingTodoList(Object.fromEntries(searchingTodoList));
		} else {
			isSearchingTodoListFlag(false)
			setSearchingTodoList(Object.fromEntries([]))
		}
	}

	const onSearchValueChange = debounce(onSearchDebounceValueChange, 10);
	return onSearchValueChange;
};
