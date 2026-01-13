/*
This file represents the Home Page.
It is used only for organizing routes and layouts.
It allows you to separate:
    (root) → main app
    (auth) → authentication
It is a Server Component (by default)
*/

import React from 'react';
//Reusable TradingView widget component. Handles script injection and widget rendering on the client.
import TradingViewWidget from "@/components/TradingViewWidget";
//TradingView widget configurations. Each object defines the behavior and appearance of a widget
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";

/*
 * Home Page
 * This page represents the root route "/"
 */
const Home = () => {
    // Base URL for TradingView embedded widgets. Specific widget scripts are appended dynamically.
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex min-h-screen home-wrapper">
          {/* First section: Market overview and heatmap */}
          <section className="grid w-full gap-8 home-section">
              <div className="md:col-span-1 xl:col-span-1">
                  {/* Market Overview widget */}
                  <TradingViewWidget
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    className="custom-chart"
                  />
              </div>
              {/* Stock Heatmap widget */}
              <div className="md-col-span xl:col-span-2">
                  <TradingViewWidget
                      title="Stock Heatmap"
                      scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      config={HEATMAP_WIDGET_CONFIG}
                  />
              </div>
          </section>

            {/* Second section: News timeline and market quotes */}
          <section className="grid w-full gap-8 home-section">
              {/* Top Stories / Timeline widget */}
              <div className="h-full md:col-span-1 xl:col-span-1">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}timeline.js`}
                      config={TOP_STORIES_WIDGET_CONFIG}
                      className="custom-chart"
                      height={600}
                  />
              </div>

              {/* Market Quotes widget */}
              <div className="h-full md:col-span-1 xl:col-span-2">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}market-quotes.js`}
                      config={MARKET_DATA_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
          </section>
        </div>
    )
}

export default  Home;
