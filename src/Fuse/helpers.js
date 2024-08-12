export const startCountdownTimer = (setGameComplete) => {
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
        setGameComplete(true)
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
export function getComplementaryColor(hex) {
  // Remove the hash at the start if it's there
  hex = hex.replace('#', '');

  // Parse the hex color to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the complementary color
  const compR = (255 - r).toString(16).padStart(2, '0');
  const compG = (255 - g).toString(16).padStart(2, '0');
  const compB = (255 - b).toString(16).padStart(2, '0');

  // Combine the complementary RGB values back into a hex string
  return `#${compR}${compG}${compB}`;
}