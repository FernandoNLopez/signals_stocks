'use client'
// Client component: relies on Next.js navigation hooks

import Link from "next/link";
import {usePathname} from "next/navigation";

import {NAV_ITEMS} from "@/lib/constants";
import SearchCommand from "@/components/SearchCommand";


/**
 * Renders the main navigation links for the application.
 * Handles active route, renders the search command as a navigation item.
 */
const NavItems = ({initialStocks}:{ initialStocks : StockWithWatchlistStatus[] }) => {

    //Retrieves the current route pathname, used to determine which navigation item is active
    const pathname:string = usePathname();

    /*
     * Checks whether a navigation item should be marked as active
     * - Exact match for home route
     * - Prefix match for nested routes
     */
    const isActive = (path: string) => {
      if (path === '/') return pathname === '/'
      return pathname.startsWith(path);
    }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {/* Render navigation items from constants */}
            {NAV_ITEMS.map(({href, label}) => {

                /**
                 * Special case: Search item
                 * Rendered as a command-style search trigger instead of a link
                 */
                if (label === 'Search') return (
                    <li key="search-trigger"> 
                        <SearchCommand
                            initialStocks={initialStocks}
                            renderAs="text"
                            label="Search"
                        />
                    </li>
                )
                /**
                 * Standard navigation link
                 * Highlights when the current route is active
                 */
                return <li key={href}>
                    <Link href={href}
                          className={`hover:text-yellow-500 transition-colors ${isActive(href) ? 'text-gray-100' : ''}`}
                    >
                        {label}
                    </Link>
                </li>
            })}
        </ul>
    )
};

export default NavItems;