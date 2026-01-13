/*
It wraps all authentication pages (/auth/sign-in, /auth/sign-up)
It protects the authentication routes by preventing a logged-in user from seeing the login/register page again.
*/

import React from "react";
// Next.js routing components
import Link from "next/link";
import Image from "next/image";
// Server-side navigation
import {redirect} from "next/navigation";
// Access to request headers (server-only)
import {headers} from "next/headers";

// Authentication provider
import {auth} from "@/lib/better-auth/auth";





/**
 * Auth Layout
 * -----------
 * Server-side layout that wraps all authentication pages.
 * - Prevents authenticated users from accessing /auth routes
 * - Provides a shared UI structure for sign-in and sign-up pages
 * This component is a Server Component by default.
 */
//React.ReactNode represents anything that can be rendered in React
const Layout = async ({ children } : {children : React.ReactNode}) => {

    /* Check for the existing session
     * Retrieve the current session using request headers
     * This runs on the server and ensures secure session validation
     */
    const session = await auth.api.getSession({ headers: await headers() });
    // If the user is already authenticated, redirect them away from auth pages
    if (session?.user) redirect('/');

    return (
        <main className="auth-layout">
            {/* Left section: Logo + Auth forms */}
            <section className="auth-left-section scrollbar-hide-default">
                {/* Brand logo linking back to home */}
                <Link
                    href="/"
                    className="auth-logo"
                >
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="Signalist logo"
                        width={140}
                        height={32}
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Render the active auth page (SignIn / SignUp) */}
                <div className="pb-6 lg:pb-8 flex-1">
                    {children}
                </div>
            </section>
            {/* Right section: Marketing / testimonial */}
            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    {/* User testimonial */}
                    <blockquote className="auth-blockquote">
                        Signalist turned my watchlist into a winning list. The alerts are spot-on, and I fell more
                        confident making moves in the market.
                    </blockquote>
                    {/* Author & rating */}
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className="auth-testimonial-author"> - Ethan R. </cite>
                            <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                        </div>
                        {/* Render star rating */}
                        <div className="flex items-center gap-1">
                            //render one Image for each []member
                            {[1, 2, 3, 4].map((star) => (
                                <Image
                                    src="/assets/icons/star.svg"
                                    alt="Star"
                                    key={star}
                                    width={40}
                                    height={20}
                                    className="w-5 h-5"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product dashboard preview */}
                <div className="flex-1 relative">
                    <Image
                        src="/assets/icons/dashboard.png"
                        alt="Dashboard"
                        width={1440}
                        height={1150}
                        className="auth-dashboard-preview absolute top-0"
                    />
                </div>

            </section>
        </main>
    )
};


export default  Layout;