/* browser.js - Browser webpack settings
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const webpack = require( "webpack" );
const path = require( "path" );

const OUTPUT_DIR = path.join( __dirname, "../lib/browser" );

module.exports = {
 	target: "web",
 	cache: false,
 	context: __dirname,
 	debug: false,
 	devtool: false,
 	entry: [ "../src/browser" ],
 	output: {
 		path: OUTPUT_DIR,
 		filename: "bundle.js",
 		chunkFilename: "[name].[id].js"
 	},
 	plugins: [
 		new webpack.DefinePlugin( {
            __CLIENT__: true,
            __SERVER__: false,
            __PRODUCTION__: true,
            __DEVELOPMENT__: false
        } ),
 		new webpack.DefinePlugin( { "process.env": { NODE_ENV: '"production"' } } ),
 		new webpack.optimize.DedupePlugin(),
 		new webpack.optimize.OccurenceOrderPlugin(),
 		new webpack.optimize.UglifyJsPlugin( { compress: { warnings: false } } )
 	],
 	module:  {
 		loaders: [
 			{ test: /\.json$/, loaders: [ "json" ] },
 			{
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loaders: [ "file?context=static&name=/[path][name].[ext]" ],
                exclude: /node_modules/
            }
 		],
 		postLoaders: [
 			{
                test: /\.js$/,
                loaders: [ "babel?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=typecheck" ],
                exclude: /node_modules/
            }
 		],
 		noParse: /\.min\.js/
 	},
 	resolve: {
 		modulesDirectories: [ "src", "node_modules", "static" ],
 		extensions: [ "", ".json", ".js" ]
 	},
 	node: { __dirname: true, fs: 'empty' }
 };
