/* debug-browser.js - Browser webpack dev server
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const webpack = require( "webpack" );
const config = require( "./browser.js" );

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = 8080;
const URL = `http://${HOSTNAME}:${PORT}`;

module.exports = config;

config.cache = true;
config.debug = true;
config.devtool = "cheap-module-eval-source-map";
config.entry.unshift( `webpack-dev-server/client?${URL}`, "webpack/hot/only-dev-server" );
config.output.publicPath = `${URL}/lib`;
config.output.hotUpdateMainFilename  = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";
config.devServer = {
	publicPath: `${URL}/lib`,
	hot: true,
	inline: false,
	lazy: false,
	quiet: false,
	noInfo: true,
	headers: { "Access-Control-Allow-Origin": "*" },
	stats: { colors: true },
	host: HOSTNAME
};
config.plugins = [
	new webpack.DefinePlugin( {
        __CLIENT__: true,
        __SERVER__: false,
        __PRODUCTION__: false,
        __DEVELOPMENT__: true
    } ),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];
config.module.postLoaders = [
	{
        test: /\.js$/,
        loaders: [ "babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre&plugins[]=typecheck" ],
        exclude: /node_modules/
    }
];
