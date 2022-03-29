let path = require('path');

//const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const conf = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname),
		filename: 'main.js',
		//publicPath: ''
	},


	devServer: {
		static: {
			directory: path.join(__dirname)
		},
		historyApiFallback: true,
		port: 8081,
		proxy: {
			"*": {
				target: "http://localhost:1777/belgo_dev/",
				secure: false, 
				changeOrigin: true,
			// 	pathRewrite: {
			// 	"^/4cities": ""
			// },
			}
		},

	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.m\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					}
				]
			},
			{
				test: /^((?!\.m).)*css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},

			{
				test: /\.m\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {
								localIdentName: '[local]__[sha1:hash:hex:7]'
							}
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},
			{
				test: /^((?!\.m).)*less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'postcss-loader',
					'less-loader'
				]
			},

			{
				test: /\.(png|jpg|jpeg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(ttf|woff)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css'
		})
		// new HtmlWebpackPlugin({
		// 	template: 'index.html'
		// })
	]
};

module.exports = (env, options) => {
	let isProd = options.mode === 'production';
	conf.devtool = isProd ? false : 'eval-cheap-module-source-map';

	return conf;
};