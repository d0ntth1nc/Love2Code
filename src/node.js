/* node.js - Node bootstrap
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
import HttpServer from "net/HttpServer";
import Logger from "core/Logger";
import {renderToString} from "react-dom/server";
import {readFile} from "fs";

const server = new HttpServer()
    .listen( 9009 )
    .on( "request", function handleRequest( url, payload, callback ) {
        callback( {}, "asdsad" );
    } )
    .on( "error", function handleError( url, error, callback ) {
        callback( {}, "errr" );
    } )
    .on( "file", function handleFile( url, callback ) {
        callback( {}, "ffff" );
    } );
