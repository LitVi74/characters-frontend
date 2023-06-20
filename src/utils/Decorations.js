function trottle(func, time) {
  let previousCall = undefined;

  return () => {
    const lastCall = Date.now();

    if (previousCall === undefined || (lastCall - previousCall) > time) {
      previousCall = lastCall;
      func();
    }
  }
}

export {
  trottle
}