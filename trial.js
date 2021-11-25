const duration = {
  hour: 2,
  minute: 60,
  sum() {
    return this.hour * 60 * 60 * 1000 + this.minute * 60 * 1000;
  },
};

const totalDuration = duration.sum();

console.log(totalDuration);

const hours = Math.floor(totalDuration / (60 * 60 * 1000));

const minutes = Math.floor((totalDuration / (60 * 1000)) % 60);

console.log(hours);
console.log(minutes);
