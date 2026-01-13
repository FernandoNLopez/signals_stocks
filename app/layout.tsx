/*
* It wraps ALL application routes. Define <HTML> and <body>
*/

import React from 'react';
//Next.js Metadata API, Used for defining SEO metadata at the application level
import type { Metadata } from "next";
//Allows toast notifications to be triggered anywhere in the app
import { Toaster } from "@/components/ui/sonner";
//Global CSS styles, Includes Tailwind base styles, custom variables, resets
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
//Global application metadata. This metadata applies to the entire app unless overridden
export const metadata: Metadata = {
    title: "FNL Signalist",
    description: "Track real-time stock prices, get personalized alerts and explore detailed company insights.",
};

/*
 * RootLayout
 * ----------
 * This is the root layout of the application.
 * It wraps every route and defines the HTML and BODY tags.
 * This is a Server Component by default
 */
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    //Children represent the active page or nested layout
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body
            /*
             * Apply font variables globally
             * - Enables usage via Tailwind or plain CSS
             * - `antialiased` improves font rendering
            */
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {/* Render the active route */}
        {children}
        {/* Global toast notifications */}
        <Toaster />
        </body>
        </html>
    );
}
