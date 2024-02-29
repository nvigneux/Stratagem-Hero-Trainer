import { useEffect, useRef } from 'react';

const useEventListener = (eventName, handler) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    if (window && typeof window !== 'undefined' && window?.addEventListener) {
      window.addEventListener(eventName, eventListener);
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    }
    return () => {};
  }, [eventName]);
};

export default useEventListener;
