/* Logger.js - Logger class
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
const newLineRegex = /\r?\n/g;
/**
 * @class Logger
 */
export default class Logger {
    constructor( name: string ) {
        this._name = name;
    }

    info( message: string ): void {
        console.info( this._encodeMessage( message ) );
    }

    fatal( message: string ): void {
        console.error( this._encodeMessage( message ) );
    }

    debug( message: string ): void {
        console.log( this._encodeMessage( message ) );
    }

    _encodeMessage( message ): string {
        var now = new Date().toLocaleString();
        var result = `[${this._name}] [${now}] ${message}`;
        return result.replace( newLineRegex, "" ).trim();
    }
}
