let examTime = 10000;

function getCountDown() {
  const timer = setInterval(() => {
    console.log((examTime -= 1000));

    if (examTime === 0) clearInterval(timer);
  }, 1000);
}

getCountDown();
