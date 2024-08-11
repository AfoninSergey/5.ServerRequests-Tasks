export const tascksHandlers = (
	setNewtaskValue,
	requestChangeTask,
	requestDeleteTask,
) => {
	const onNewTaskChange = ({ target: { value } }) => {
		setNewtaskValue(value);
	};

	const onCurrentTaskButtonChange = ({ target }) => {
		const currentInput = target.closest('li').children[0].children[0];
		if (target.dataset.edit === 'change') {
			currentInput.removeAttribute('readonly');
			currentInput.focus();
			currentInput.value = currentInput.placeholder;
			target.dataset.edit = 'save';
			target.textContent = 'Сохранить';
		} else {
			const newValue = currentInput.value;
			const currentId = currentInput.id;
			currentInput.placeholder = newValue;
			currentInput.setAttribute('readonly', true);
			target.dataset.edit = 'change';
			target.textContent = 'Изменить';
			requestChangeTask(currentId, newValue);
		}
	};

	const onCurrentTaskButtonDelete = ({ target }) => {
		const currentId = target.closest('li').children[0].children[0].id;
		requestDeleteTask(currentId);
	};

	const onEmptyChangeTest = ({ target }) => {
		if (target.value.length === 0) target.placeholder = '';
	};

	return {
		onNewTaskChange,
		onCurrentTaskButtonChange,
		onCurrentTaskButtonDelete,
		onEmptyChangeTest,
	};
};
