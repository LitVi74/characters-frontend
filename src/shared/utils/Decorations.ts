/* eslint no-undef-init: off */

export default function trottle(func: () => void, time: number) {
  let previousCall: undefined | number = undefined;

  return () => {
    const lastCall = Date.now();

    if (previousCall === undefined || (lastCall - previousCall) > time) {
      previousCall = lastCall;
      func();
    }
  }
}
