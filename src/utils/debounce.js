import { TODOS_URL } from '../constants/todos-url';

export const debounceFn = (requestGetTasks) => {
	function debounce(func, wait) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, arguments), wait);
		};
	}

	function onSearchDebounceValueChange(value) {
		requestGetTasks(`${TODOS_URL}?title_like=${value.trim()}`);
	}

	const onSearchValueChange = debounce(onSearchDebounceValueChange, 1000);
	return onSearchValueChange;
};
