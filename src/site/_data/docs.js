const fetchData = require('../helpers/fetchData.js');

const endPoint = 'https://foxland.foxnet.fi/wp-json/wp/v2/doc?per_page=10';

module.exports = async function fetchPages() {
	return fetchData('docs', endPoint);
};
