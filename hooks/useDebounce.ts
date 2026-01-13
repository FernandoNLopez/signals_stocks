'use client';

/*
Its purpose is to control the frequency of execution of a function, preventing it from triggering on every event.
*/

/*
    useRef → maintains the timeout between renders without causing re-renders
    useCallback → memorizes the debounced function to avoid recreating it
*/
import { useCallback, useRef } from 'react';


/*
 * Custom hook that delays the execution of a callback function until a specified amount of time has passed without new calls.
 */
export function useDebounce(callback: () => void, delay: number) {
    /* Stores the current timeout ID. Persists across renders without causing re-renders */
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Returns a debounced version of the callback. Each call resets the timer.
    return useCallback(() => {

        // Clear any existing timeout to reset the debounce delay
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Schedule the callback to run after the delay
        timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay])
}