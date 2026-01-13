/*
* Resolve the symbol from the URL.
* Configure external widgets (TradingView)
* Orchestrate the UI (layout + widgets)
*
*/

// Reusable TradingView widget wrapper. Handles script injection and widget rendering.
import TradingViewWidget from "@/components/TradingViewWidget";
// Client component that allows the user. To add/remove a stock from their watchlist
import WatchlistButton from "@/components/WatchlistButton";
//TradingView widget configuration factories. Each one receives a stock symbol and returns the appropriate widget configuration object.
import {
    SYMBOL_INFO_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    BASELINE_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    COMPANY_PROFILE_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";


/**
 * Stock Details Page
 * ------------------
 * Server Component rendered for a dynamic stock symbol.
 * Route: /stocks/[symbol]
 *
 * Responsibilities:
 * - Extract the stock symbol from the URL
 * - Configure and render multiple TradingView widgets
 * - Display stock-related information and charts
 */
export default async function StockDetails({ params }: StockDetailsPageProps) {
    // Stock symbol extracted from the dynamic route. Example: "AAPL", "TSLA", "MSFT".
    const { symbol } = await params;
    // Base URL for TradingView external widget scripts. Each widget appends its own script name
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
            {/* Main responsive grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                {/* Left column: charts */}
                <div className="flex flex-col gap-6">

                    {/* Symbol overview */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}symbol-info.js`}
                        config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
                        height={170}
                    />

                    {/* Candlestick chart */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}advanced-chart.js`}
                        config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
                        className="custom-chart"
                        height={600}
                    />

                    {/* Baseline chart */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}advanced-chart.js`}
                        config={BASELINE_WIDGET_CONFIG(symbol)}
                        className="custom-chart"
                        height={600}


                    />
                </div>

                {/* Right column: actions & company data */}
                <div className="flex flex-col gap-6">
                    {/* Watchlist action */}
                    <div className="flex items-center justify-between">
                        <WatchlistButton symbol={symbol.toUpperCase()} company={symbol.toUpperCase()} isInWatchlist={false} />
                    </div>

                    {/* Technical indicators */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}technical-analysis.js`}
                        config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
                        height={400}
                    />

                    {/* Company profile */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}company-profile.js`}
                        config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
                        height={440}
                    />

                    {/* Financial statements */}
                    <TradingViewWidget
                        scriptUrl={`${scriptUrl}financials.js`}
                        config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
                        height={464}
                    />
                </div>
            </section>
        </div>
    );
}