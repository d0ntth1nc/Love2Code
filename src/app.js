/* app.js - Main app module
 *
 * Copyright (C) 2016 Alexander Seferinkyn
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */
import {EventEmitter} from "events";
import React from "react";

/**
 * Public API
 */
export const dispatcher = new EventEmitter();
