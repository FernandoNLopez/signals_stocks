"use client"
// Client-side component: uses hooks, browser events and interactive UI

import { useEffect, useState } from "react"
import Link from "next/link";
import {Loader2, Star, TrendingUp} from "lucide-react";

import {searchStocks} from "@/lib/actions/finnhub.actions";
import {useDebounce} from "@/hooks/useDebounce";

import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import {Button} from "@/components/ui/button";


/**
 * SearchCommand
 * --------------
 * Command-style search dialog for stocks.
 * Allows users to quickly search and navigate to stock detail pages.
 * Supports keyboard shortcut (Cmd/Ctrl + K) and debounced API searching.
 */
export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) {
    //Controls the visibility of the command dialog
    const [open, setOpen] = useState(false)
    //Stores the current search input value
    const [searchTerm, setSearchTerm] = useState("")
    //Indicates when an API request is in progress
    const [loading, setLoading] = useState(false)
    //Holds the list of stocks to display --> Initially populated with predefined stocks
    const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

    //Determines whether the user is actively searching
    const isSearchMode = !!searchTerm.trim();
    // Limits the number of displayed stocks when not searching
    const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);


    //Toggles the command dialog
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault()
                setOpen(v => !v)
            }
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    /**
     * Executes the stock search
     * - Resets to initial stocks if input is empty
     * - Fetches filtered results from the API otherwise
     */
    const handleSearch = async () => {
        if(!isSearchMode) return setStocks(initialStocks);

        setLoading(true)
        try {
            const results = await searchStocks(searchTerm.trim());
            setStocks(results);
        } catch {
            // Fallback to empty list on API error
            setStocks([])
        } finally {
            setLoading(false)
        }
    }
    //Prevents excessive API calls while typing
    const debouncedSearch = useDebounce(handleSearch, 300);

    //Triggers the debounced search whenever the input changes
    useEffect(() => {
        debouncedSearch();
    }, [searchTerm]);

    //Resets search state after selecting a stock
    const handleSelectStock = () => {
        setOpen(false);
        setSearchTerm("");
        setStocks(initialStocks);
    }

    return (
        <>
            {/* Trigger element (button or text) */}
            {renderAs === 'text' ? (
                <span onClick={() => setOpen(true)} className="search-text">
            {label}
          </span>
            ): (
                <Button onClick={() => setOpen(true)} className="search-btn">
                    {label}
                </Button>
            )}
            {/* Command dialog container */}
            <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
                {/* Search input field */}
                <div className="search-field">
                    <CommandInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search stocks..." className="search-input" />
                    {loading && <Loader2 className="search-loader" />}
                </div>
                {/* Results list */}
                <CommandList className="search-list">
                    {loading ? (
                        <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
                    ) : displayStocks?.length === 0 ? (
                        <div className="search-list-indicator">
                            {isSearchMode ? 'No results found' : 'No stocks available'}
                        </div>
                    ) : (
                        <ul>
                            {/* Section label */}
                            <div className="search-count">
                                {isSearchMode ? 'Search results' : 'Popular stocks'}
                                {` `}({displayStocks?.length || 0})
                            </div>

                            {/* Stock results */}
                            {displayStocks?.map((stock, i) => (
                                <li key={stock.symbol} className="search-item">
                                    <Link
                                        href={`/stocks/${stock.symbol}`}
                                        onClick={handleSelectStock}
                                        className="search-item-link"
                                    >
                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                        <div  className="flex-1">
                                            <div className="search-item-name">
                                                {stock.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {stock.symbol} | {stock.exchange } | {stock.type}
                                            </div>
                                        </div>
                                        {/* Watchlist indicator */}
                                        {<Star />}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                    }
                </CommandList>
            </CommandDialog>
        </>
    )
}