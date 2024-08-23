// SEE THIS TUTORIAL
// https://finmavis.dev/blog/webpack-configuration-step-by-step

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// process.cwd will return a path to our active project directory
const ROOT_DIR = process.cwd();


module.exports = {
	devServer: {
		// Enable gzip compression
		compress: true,
		// Serves everything from our dist folder which is our output folder
		// contentBase: path.resolve(ROOT_DIR, 'dist'),
		// This will shows a full-screen overlay in the browser when there are compiler errors
		host: '0.0.0.0',
		// overlay: true,
		port: 3000,
		static: {
			// Serves everything from our dist folder which is our output folder
			directory: path.resolve(ROOT_DIR, 'dist'),
		}
	},
	// Development Tools (Map Errors To Source File)
  	devtool: 'source-map',
  	// source
	// entry: { 
	// 	main: path.resolve(ROOT_DIR, 'src/index.js')
	// },
	entry: path.resolve(ROOT_DIR, 'src/index.js'),
	mode: 'development',
	output: {
		path: path.resolve(ROOT_DIR, 'dist'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js'
	},
	module: {
		rules: [
			// CSS
			{
				test: /\.css$/i,
				use: [
					"style-loader",
				  	{
						loader: "css-loader",
						options: {
					  		modules: true,
					  		importLoaders: 1,
						},
				  	},
				  	"postcss-loader",
				],
			},
			// js/jsx (es6 friendly)
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: { 
					loader: 'babel-loader',
					options: {
						// Enabled cache for faster recompilation
						cacheDirectory: true,
						/**
						* Here we tell babel where to find babel config file
						* Note that we can also put our babel config (presets and plugins) here
						* Since Babel 7, using .babelrc filename not recommended
						* Here we are using the new recommended filename
						* using babel.config.js filename
						* Docs: https://babeljs.io/docs/en/config-files
						*/
						configFile: path.resolve(ROOT_DIR, 'config/babel.config.js'),
					}
				}
			},
			// image loader
			{
				test: /\.(gif|jpg|png|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							// inline files < 4kb using bse64 URIs
							limit: 4096,
							// output folder for assets (ie: dist/assets)
							outputPath: 'assets'
						}
					}
				]
			},
			// fonts
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets'
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(ROOT_DIR, 'src/index.html'),
			filename: 'index.html',
			hash: true
		})
	]
};