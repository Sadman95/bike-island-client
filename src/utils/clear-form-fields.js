export function clearFormFields(formId) {
	const form = document.getElementById(formId);
	if (form) {
		form.reset();
	}
}
