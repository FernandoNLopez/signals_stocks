'use client'
// Client-side component required because we use hooks and client navigation

import React from 'react';
import {useRouter} from "next/navigation";
// Server action used to terminate the user session
import { signOut } from '@/lib/actions/auth.actions';
import {LogOut} from "lucide-react";
// UI components (Shadcn)
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {  Avatar, AvatarFallback, AvatarImage  } from "@/components/ui/avatar";
// Mobile navigation items rendered inside the dropdown
import NavItems from "@/components/NavItems";

/**
 * UserDropdown
 * -------------
 * Displays the authenticated user's avatar and name.
 * Provides a dropdown menu with user info, logout action
 * and mobile navigation items.
 */

const UserDropdown = ({ user, initialStocks } : { user : User, initialStocks : StockWithWatchlistStatus[] }) => {

    //Used to redirect the user after logging out
    const router = useRouter();
    //Handler session --> Calls the signOut server action and Redirects the user to the sign-in page
    const handleSignOut = async () => {
        await signOut()
        router.push("/sign-in");
    }

    return (
        <DropdownMenu>
            {/* Button that triggers the dropdown menu */}
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
                    {/* User avatar */}
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://avatars.githubusercontent.com/u/102260759?s=400&u=9c4bd906b31396775903da645daf3900f55c0523&v=4" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    {/* Username (hidden on small screens) */}
                    <div className="hidden md:flex flex-col items-start">
                        <span className='text-base font-medium text-gray-400'>
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            {/* Dropdown content */}
            <DropdownMenuContent className="text-gray-400">
                {/* User profile summary */}
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/102260759?s=400&u=9c4bd906b31396775903da645daf3900f55c0523&v=4" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        {/* User name and email */}
                        <div className="flex flex-col">
                            <span className='text-base font-medium text-gray-400'>
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600"/>
                {/* Logout action */}
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
                {/* Mobile-only navigation items */}
                <nav className="sm:hidden">
                    <NavItems initialStocks={initialStocks} />
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserDropdown;