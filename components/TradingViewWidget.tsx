'use client';
// Client component required because it uses hooks and interacts with the DOM

import React, {memo, useRef} from 'react';
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import {cn} from "@/lib/utils";

/**
 * Props definition for the TradingViewWidget component
 * These values are also used by the custom TradingView hook
 */
interface TradingViewWidgetProps {
    title?: string;                                          // Optional widget title
    scriptUrl: string;                                       // TradingView script source URL
    config: Record<string, unknown>;                         // TradingView widget configuration
    height?: number;                                         // Widget height (default: 600)
    className?: string;                                      // Optional custom container styles
    width?: number;                                          // Optional width (handled internally)
}


/**
 * TradingViewWidget
 * ------------------
 * Reusable wrapper component for embedding TradingView widgets.
 * It loads the TradingView script dynamically and mounts the widget
 * inside a referenced DOM container using a custom hook.
 */
const TradingViewWidget = ({  title, scriptUrl, config, height = 600, className  } : TradingViewWidgetProps) => {

    const containerRef = useTradingViewWidget(scriptUrl, config, height); //call hook

    /**
     * Initializes the TradingView widget
     * - Injects the external script
     * - Attaches the widget to the container DOM element
     * - Handles cleanup on unmount
     */
    return (
        <div className="w-full">
            {/* Optional widget title */}
            {title && <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>}
            {/* TradingView widget container */}
            <div
                className={cn('tradingview-widget-container', className)}
                ref={containerRef} //data
            >
                {/* TradingView injects the iframe/widget into this element */}
                <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }} />
            </div>
        </div>
        );
    };
/**
 * Memoized export to prevent unnecessary re-renders
 * Widget will only re-render when props change
 */
export default memo(TradingViewWidget);