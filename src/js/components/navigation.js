/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
const navigation = () => {
	// Menu variable.
	const container = document.getElementById('js-menu--primary');

	// Bail if there is no menu.
	if (!container) {
		return;
	}

	// Variables.
	const button = container.getElementsByTagName('button')[0];
	const menu = container.getElementsByTagName('ul')[0];
	const links = menu.getElementsByTagName('a');
	let timeout;

	/**
	 * Is menu open.
	 *
	 * @returns {boolean} True or false.
	 */
	function isMenuOpen() {
		const isMenuOpenCheck = button.getAttribute('aria-expanded') !== 'false';
		return isMenuOpenCheck;
	}

	/**
	 * Toggle menu classes and ARIA.
	 */
	function toggleMenu() {
		container.classList.toggle('is-opened');
		menu.classList.toggle('is-opened');
		button.classList.toggle('is-opened');

		const expanded = button.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
		button.setAttribute('aria-expanded', expanded);
	}

	/**
	 * Reset menu on "desktop".
	 */
	function resetMenu() {
		// If menu toggle button have display: none css rule, we're on desktop.
		if (window.getComputedStyle(button, null).getPropertyValue('display') === 'none') {
			container.classList.remove('is-opened');
			menu.classList.remove('is-opened');
			button.setAttribute('aria-expanded', 'false');
		}
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		let self = this;

		// Move up through the ancestors of the current link until we hit .js-nav-menu.
		while (self.className.indexOf('js-nav-menu') === -1) {
			// On li elements toggle the class .focus.
			if (self.tagName.toLowerCase() === 'li') {
				if (self.className.indexOf('focus') !== -1) {
					self.classList.remove('focus');
				} else {
					self.classList.add('focus');
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Each time a menu link is focused or blurred, toggle focus.
	 */
	function menuLinksFocused() {
		if (!menu.classList.contains('js-nav-menu')) {
			menu.classList.add('js-nav-menu');
		}

		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('focus', toggleFocus, true);
			links[i].addEventListener('blur', toggleFocus, true);
		}
	}

	// Toggle menu on button click.
	button.addEventListener(
		'click',
		function () {
			toggleMenu();
		},
		false,
	);

	// Close menu using Esc key.
	document.addEventListener(
		'keyup',
		function (event) {
			if (event.keyCode && isMenuOpen() === 27) {
				toggleMenu();
				button.focus();
			}
		},
		false,
	);

	// Reset menu when on "desktop".
	window.addEventListener(
		'resize',
		function () {
			// Wait for a while before firing the event again.
			if (!timeout) {
				/* eslint-disable no-undef */
				timeout = setTimeout(function () {
					// Reset timeout.
					timeout = null;

					// Run our resize functions.
					resetMenu();
				}, 66);
			}
		},
		false,
	);

	// Init menu link focus class.
	menuLinksFocused();
};

export default navigation;
