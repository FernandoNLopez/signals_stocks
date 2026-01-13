import React from 'react';
import Link from "next/link";
import Image from "next/image";

import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";
import {searchStocks} from "@/lib/actions/finnhub.actions";

/**
 * Header
 * ------
 * Server component responsible for rendering the main application header.
 * It preloads stock data on the server and passes it down to
 * client components that require it (navigation and search).
 */
const Header = async ({ user }: { user: User }) => {

    /**
     * Pre-fetch initial stock data on the server
     * This data is reused by multiple client components
     * to avoid duplicate API calls on the client
     */
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                {/* Application logo / Home navigation */}
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.svg"
                        width={140}
                        height={32}
                        alt="Logo"
                        className="h-8 w-auto cursor-pointer"
                    />
                </Link>
                {/* Desktop navigation */}
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>
                {/* User profile dropdown and mobile navigation */}
                 <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    )
}

export default  Header;
