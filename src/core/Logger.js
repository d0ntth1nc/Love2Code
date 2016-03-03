/* Logger.js - Logger class
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const newLineRegex = /\r?\n/;
/**
 * @class Logger
 */
export default class Logger {
    constructor( name: string ) {
        this._name = name;
    }

    info( message: string ) {
        console.info( this._encodeMessage( message ) );
    }

    fatal( message: string ) {
        console.error( this._encodeMessage( message ) );
    }

    debug( message: string ) {
        console.log( this._encodeMessage( message ) );
    }

    _encodeMessage( message ) {
        var trimmed = message.replace( newLineRegex, "" ).trim();
        var now = new Date().toLocaleString();
        var result = `[${this._name}] [${now}] ${message}`;
        return result;
    }
}
