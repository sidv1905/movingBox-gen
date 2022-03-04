import { useRef } from "react";
// Returns a function which accepts a callback and returns a function
export default function useThrottle() {
  const throttled = useRef(false);

  function throttle(func: any, wait: number) {
    if (throttled.current) {
      return;
    }

    throttled.current = true;
    func();
    setTimeout(() => {
      throttled.current = false;
    }, wait);
  }

  return throttle;
}
