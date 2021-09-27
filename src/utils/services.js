"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originUrl = void 0;
exports.originUrl = process.env.NODE_ENV === 'development'
    ? 'https://hidden-fjord-42920.herokuapp.com'
    : 'http://localhost:3000';
