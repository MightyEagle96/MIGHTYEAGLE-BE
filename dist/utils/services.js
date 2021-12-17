"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeQuestions = exports.originUrl = void 0;
//export const originUrl = 'https://me-school.herokuapp.com';
exports.originUrl = 'http://localhost:3000';
//export const originUrl = 'http://192.168.41.129:3000';
const randomizeQuestions = (arrayToRandomize, limit) => {
    let randomizedArray = [];
    let array = [];
    for (let i = 0; i < limit; i++) {
        let x = Math.floor(Math.random() * limit);
        if (array.includes(x)) {
            for (let j = 0; j < limit; j++) {
                let y = Math.floor(Math.random() * limit);
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
        for (let i = 0; i < limit; i++) {
            if (!array.includes(i))
                array.push(i);
        }
    }
    // return array;
    for (let i = 0; i < arrayToRandomize.length; i++) {
        randomizedArray.push(arrayToRandomize[array[i]]);
    }
    return randomizedArray;
};
exports.randomizeQuestions = randomizeQuestions;
