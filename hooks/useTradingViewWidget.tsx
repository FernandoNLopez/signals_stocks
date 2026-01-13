'use client';

/* The responsibility of this hook is to dynamically inject TradingView widgets into the DOM using external scripts.
   It's a clean abstraction that:
        * Avoids repeating logic in each component
        * Controls mounting/unmounting
        * Prevents duplicate widget loading
*/


/**
 * React hooks
 * - useRef: keeps a persistent reference to a DOM element
 * - useEffect: handles side effects like script injection
 */
import {  useEffect, useRef  } from "react";


/**
 * useTradingViewWidget
 * --------------------
 * Custom hook that dynamically injects a TradingView widget script into a DOM container.

 * Responsibilities:
 * - Create and manage a DOM container reference
 * - Inject the TradingView script with the provided configuration
 * - Prevent duplicate widget loading
 * - Clean up on unmount to avoid memory leaks
 */
const useTradingViewWidget = ( scriptUrl : string, config : Record<string, unknown>, height = 600  ) => {

    // Reference to the widget container DOM element. This ref is attached to a div in the component
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Effect responsible for loading the TradingView widget. Runs whenever the script URL, config, or height changes.
    useEffect(() => {

        // Ensure the container exists
        if (!containerRef.current) return;
        // Prevent re-loading the widget if it was already initialized
        if(containerRef.current.dataset.loaded) return;

        //Inject the internal container required by TradingView. TradingView widgets lives on this specific DOM structure
        containerRef.current.innerHTML = `<div 
                                            class="tradingview-widget-container__widget" 
                                            style="width: 100%;
                                            height: ${height}px;"
                                            > 
                                          </div>`;

        /**
         * Create the external TradingView script
         * The config object is injected as a JSON string
         */
        const script = document.createElement("script");
        script.src = scriptUrl; //dinamic url
        script.async = true;
        script.innerHTML = JSON.stringify(config); //config specified through props

        // Append the script to the container to trigger widget initialization
        containerRef.current.appendChild(script)//append properties to the container ref
        // Mark the container as loaded to avoid duplicate injections
        containerRef.current.dataset.loaded = "true";

        // Cleanup function. Runs when the component using this hook unmounts.
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;//delete loaded property
            }
        }

    }, [scriptUrl, config, height]); //props

    // Return the container ref so it can be attached to a DOM element in the component
    return containerRef;
};

export default useTradingViewWidget;


/*
* Depending on a specific chart widget that we want to load, we return the container ref we just attach to this new
 chart with the props.
* NOTE:
 This hook allows different TradingView widgets to be loaded dynamically by simply changing the script URL and config.
 The component using this hook only needs to attach the returned ref.
*/