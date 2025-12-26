import React from 'react';
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";




const Header = ({ user }: { user: User }) => {
    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo.svg"
                        width={140}
                        height={32}
                        alt="Logo"
                        className="h-8 w-auto cursor-pointer"
                    />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems />
                </nav>
                 <UserDropdown user={user} />
            </div>
        </header>
    )
}

export default  Header;
