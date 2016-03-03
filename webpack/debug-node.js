/* debug-node.js - Node dev webpack server
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const webpack = require( "webpack" );
const config = require( "./node.js" );

const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = 9901;

module.exports = config;

config.cache = true;
config.debug = true;
config.entry.unshift( "webpack/hot/poll?1000" );
config.output.publicPath = `http://${HOSTNAME}:${PORT}/lib/browser`;
config.plugins = [
	new webpack.DefinePlugin( {
        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: false,
        __DEV__: true
    } ),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];
