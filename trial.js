let friends = [
  { name: 'Joy', age: 25 },
  { name: 'Favour', age: 22 },
  { name: 'Dubem', age: 25 },
];

const index = friends.findIndex((d) => d.name === 'Dubem' && d.age === 25);
console.log(index);

friends.splice(index, 1);
console.log(friends);
