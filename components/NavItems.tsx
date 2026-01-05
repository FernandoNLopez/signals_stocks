'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

import {NAV_ITEMS} from "@/lib/constants";
import SearchCommand from "@/components/SearchCommand";



const NavItems = ({initialStocks}:{ initialStocks : StockWithWatchlistStatus[] }) => {

    const pathname:string = usePathname();

  const isActive = (path: string) => {
      if (path === '/') return pathname === '/'

      return pathname.startsWith(path);
  }

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">

            {NAV_ITEMS.map(({href, label}) => {

                if (label === 'Search') return (
                    <li key="search-trigger"> 
                        <SearchCommand
                            initialStocks={initialStocks}
                            renderAs="text"
                            label="Search"
                        />
                    </li>
                )

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