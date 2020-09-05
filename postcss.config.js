module.exports = ({ env, file }) => ({
	plugins: {
		'postcss-import': {},
		'postcss-preset-env': {
			stage: 0,
			features: {
				'custom-properties': true,
			},
		},
		'postcss-mixins': {},
		'postcss-nested': {},
		autoprefixer: {},
		// Prefix editor styles with class `editor-styles-wrapper`.
		'postcss-editor-styles':
			file.basename === 'editor.css'
				? {
						scopeTo: '.editor-styles-wrapper',
						ignore: [':root', '.edit-post-visual-editor.editor-styles-wrapper'],
						remove: ['html', ':disabled', '[readonly]', '[disabled]'],
						tags: ['button', 'input', 'label', 'select', 'textarea', 'form'],
				  }
				: false,
		// Minify styles on production using cssano.
		cssnano:
			env === 'production'
				? {
						preset: ['default', { discardComments: { removeAll: true } }],
				  }
				: false,
	},
});
