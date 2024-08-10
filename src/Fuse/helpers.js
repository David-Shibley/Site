export const startCountdownTimer = () => {
  const timeNow = new Date().getTime();
  const countDownDate = new Date(timeNow + 600000).getTime();
  let x;

  x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const demoTag = document.getElementById("demo");
    if (demoTag) {
      demoTag.innerHTML = minutes + "m " + seconds + "s ";
    }

    if (distance < 0) {
      clearInterval(x);
      if (demoTag) {
        demoTag.innerHTML = "EXPIRED";
      }
    }
  }, 1000);

  return x; // return the interval ID
};

export const stopCountdownTimer = (intervalId) => {
  clearInterval(intervalId);
  const demoTag = document.getElementById("demo");
  if (demoTag) {
    demoTag.innerHTML = "";
  }
};
