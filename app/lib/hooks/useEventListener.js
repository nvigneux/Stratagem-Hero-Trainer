import { useEffect, useRef } from 'react';

/**
 * Custom hook for adding an event listener to the window object.
 * @param {string} eventName - The name of the event to listen for.
 * @param {Function} handler - The function to handle the event.
 */
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
