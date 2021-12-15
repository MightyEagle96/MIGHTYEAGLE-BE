"use strict";
// export const originUrl =
//   process.env.NODE_ENV === 'development'
//     ? 'https://hidden-fjord-42920.herokuapp.com'
//     : 'http://localhost:3000';
//export const originUrl = 'https://me-school.herokuapp.com';
//export const originUrl = 'http://localhost:3000';
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeQuestions = exports.originUrl = void 0;
exports.originUrl = 'http://192.168.41.129:3000';
var randomizeQuestions = function (arrayToRandomize, limit) {
    var randomizedArray = [];
    var array = [];
    for (var i = 0; i < limit; i++) {
        var x = Math.floor(Math.random() * limit);
        if (array.includes(x)) {
            for (var j = 0; j < limit; j++) {
                var y = Math.floor(Math.random() * limit);
                if (array.includes(y) === false && array[i] !== y) {
                    array.push(y);
                    break;
                }
            }
        }
        else
            array.push(x);
    }
    if (array.length !== limit && array.length < limit) {
        for (var i = 0; i < limit; i++) {
            if (!array.includes(i))
                array.push(i);
        }
    }
    // return array;
    for (var i = 0; i < arrayToRandomize.length; i++) {
        randomizedArray.push(arrayToRandomize[array[i]]);
    }
    return randomizedArray;
};
exports.randomizeQuestions = randomizeQuestions;
