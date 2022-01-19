export default function throttle(callback, time, ...callbackArgs) {
  let pause;

  return function() {
    if (!pause) {
      callback.apply(this, ...callbackArgs);
      pause = true;

      setTimeout(() => pause = false, time)
    }
  }
}