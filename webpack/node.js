/* node.js - Node webpack settings
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const webpack = require( "webpack" );
const externals = require( "webpack-node-externals" );
const path = require( "path" );

const OUTPUT_DIR = path.join( __dirname, "../lib" );

module.exports = {
	target: "node",
	context: __dirname,
	debug: false,
	devtool: "source-map",
	entry: [ "../src/node" ],
	output: { path: OUTPUT_DIR, filename: "node.js" },
	plugins: [
		new webpack.DefinePlugin( {
            __CLIENT__: false,
            __SERVER__: true,
            __PRODUCTION__: true,
            __DEVELOPMENT__: false
        } ),
		new webpack.DefinePlugin( {
            "process.env": { NODE_ENV: '"production"' }
        } )
	],
	module: {
		loaders: [
			{ test: /\.json$/, loaders: [ "json" ] },
			{
                test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
                loaders: [ "file?context=static&name=/[path][name].[ext]" ], exclude: /node_modules/
            },
			{
                test: /\.js$/,
                loaders: [ "babel?presets[]=es2015&presets[]=stage-0&presets[]=react&plugins[]=typecheck" ],
                exclude: /node_modules/
            }
		],
		postLoaders: [],
		noParse: /\.min\.js/
	},
	externals: [
        externals( { whitelist: [ "webpack/hot/poll?1000" ] } )
    ],
	resolve: {
		modulesDirectories: [ "src", "node_modules", "static" ],
		extensions: [ "", ".json", ".js" ]
	},
	node: { __dirname: true, fs: "empty" }
};
