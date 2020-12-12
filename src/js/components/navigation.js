/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
const navigation = () => {
	// Menu variable.
	const container = document.querySelector('.nav--primary');

	// Bail if there is no menu.
	if (!container) {
		return;
	}
	console.log(container);
};

export default navigation;
