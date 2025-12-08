'use client';

import {  useEffect, useRef  } from "react";

const useTradingViewWidget = ( scriptUrl : string, config : Record<string, unknown>, height = 600  ) => {

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        if (!containerRef.current) return;
        if(containerRef.current.dataset.loaded) return;

        containerRef.current.innerHTML = `<div 
                                            class="tradingview-widget-container__widget" 
                                            style="width: 100%;
                                            height: ${height}px;"
                                            > 
                                          </div>`;

        const script = document.createElement("script");
        script.src = scriptUrl; //dinamic url
        script.async = true;
        script.innerHTML = JSON.stringify(config); //config specified through props

        containerRef.current.appendChild(script)//append properties to the container ref
        containerRef.current.dataset.loaded = "true";

        //clean it up on unmount the of the function
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;//delete loaded property
            }
        }

    }, [scriptUrl, config, height]); //props

    return containerRef;
};

export default useTradingViewWidget;


/*
* Depending on a specific chart widget that we want to load, we return the container ref we just attach to this new
* chart with the props.
* */