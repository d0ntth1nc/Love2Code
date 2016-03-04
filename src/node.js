/* node.js - Node bootstrap
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
import HttpListener from "net/HttpListener";
import Logger from "core/Logger";
//import StateManager from "core/StateManager";
//import Page from "core/Page";
import mime from "mime";
import {renderToString} from "react-dom/server";
import {readFile} from "fs";
import {join as joinPaths} from "path";
import {loadState, loadPage} from "app";

const FILES_DIR = "";
const PORT = 9009;
const EMPTY_BUFFER = new Buffer( 0 );
const APP_SCRIPT_SRC = "http://localhost:8080/lib/bundle.js";
const HttpStatus = {
    Success: 200,
    NotFound: 404,
    Error: 400
};
const server = new HttpListener()
    .listen( PORT )
    .on( "request", handleRequest )
    .on( "error", handleError )
    .on( "file", handleFile );

function handleRequest( url: Object, payload: ?Object, callback: Function ): void {
    // var stateManager = new StateManager();
    // var page = new Page( stateManager );
    callback( HttpStatus.Success, {}, new Buffer( getHtml( "", "", "" ) ) );
}

function handleError( url: Object, error: Error, callback: Function ): void {
    var title = "Internal error";
    var errorMessage = error.message || title;
    var html = getHtml( title, errorMessage, "" );
    callback( HttpStatus.Error, {}, new Buffer( html ) );
}

function handleFile( url: Object, callback: Function ): void {
    var fileName = joinPaths( FILES_DIR, url.pathname );
    readFile( fileName, function processFile( error: Error, buffer: ?Buffer ): void {
        var headers = { "Content-Type": mime.lookup( fileName ) };
        if ( error ) {
            callback( HttpStatus.NotFound, headers, EMPTY_BUFFER );
        } else {
            callback( HttpStatus.Success, headers, buffer );
        }
    } );
}

function getHtml( title: string, data: string, state: string ): string {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>${title}</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
  </head>
  <body>
    <div id="root">${data}</div>
    <script id="state" data-state="${state}"></script>
    <script src="${APP_SCRIPT_SRC}"></script>
  </body>
</html>`;
}
