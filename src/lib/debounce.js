export default function debounce(callback, waitTime, ...args) {
  let timerId
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, waitTime);
  }
}