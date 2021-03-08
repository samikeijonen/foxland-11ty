const { helpers, loaders, plugins, presets } = require( '@foxland/webpack-tiny-helpers' );
const { filePath } = helpers;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const baseFilename = isDev ? '[name]' : '[name].[contenthash]';

const presetsConfig = isDev ? presets.development : presets.production;

// We copy fonts etc. using Eleventy.
loaders.css.defaults.options.url = false;

const config = presetsConfig( {
	entry: {
		index: filePath( 'src/js/index.js' ),
		main: filePath( 'src/css/main.css' ),
		editor: filePath( 'src/css/editor.css' ),
	},
	output: {
		path: filePath( 'dist/assets' ),
		filename: `${baseFilename}.js`,
	},
} );

// Generate a final configuration object, overriding the property
// we want to change.
module.exports = {
	...config,
	module: {
		rules: [
		// Styles.
		{
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: isDev,
						// We copy fonts etc. using CopyWebpackPlugin.
						url: false,
					},
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: isDev,
					},
				},
			],
		},
		],
	},
	plugins: [
		...config.plugins,
		// Extract CSS into individual files.
		new MiniCssExtractPlugin({
			filename: `${baseFilename}.css`,
			chunkFilename: '[id].css',
		}),
		// Use ManifestPlugin on prod and dev.
		plugins.manifest({ publicPath: '/assets/' }),
	],
};
