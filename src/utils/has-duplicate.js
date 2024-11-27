function hasDuplicate(array) {
	const uniqueItems = new Set(array);
	return uniqueItems.size !== array.length;
}
export default hasDuplicate;
