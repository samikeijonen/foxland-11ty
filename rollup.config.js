import {terser} from 'rollup-plugin-terser';

export default {
	input: 'src/js/main.js',
	output: {
		file: 'dist/assets/main.js',
		format: 'iife',
		plugins: [terser()]
	}
};
