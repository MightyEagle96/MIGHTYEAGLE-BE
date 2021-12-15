// export const originUrl =
//   process.env.NODE_ENV === 'development'
//     ? 'https://hidden-fjord-42920.herokuapp.com'
//     : 'http://localhost:3000';
//export const originUrl = 'https://me-school.herokuapp.com';
//export const originUrl = 'http://localhost:3000';

export const originUrl = 'http://192.168.41.129:3000';

export const randomizeQuestions = (arrayToRandomize: [], limit: number) => {
  let randomizedArray: any = [];
  let array: any = [];
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
    } else array.push(x);
  }
  if (array.length !== limit && array.length < limit) {
    for (let i = 0; i < limit; i++) {
      if (!array.includes(i)) array.push(i);
    }
  }

  // return array;
  for (let i = 0; i < arrayToRandomize.length; i++) {
    randomizedArray.push(arrayToRandomize[array[i]]);
  }

  return randomizedArray;
};
