import React from "react";
// Access HTTP request headers (server-only). Used here to retrieve auth session data.
import {headers} from "next/headers";
// Server-side redirect utility. Prevents rendering when redirecting
import {redirect} from "next/navigation";
// Authentication instance (Better Auth). Provides session validation methods.
import {auth} from "@/lib/better-auth/auth";
// Main application header. Displays navigation and user information.
import Header from "@/components/Header";


/*
 * Root Layout for the "(root)" route group
 * ----------------------------------------
 * - Protects all routes under (root)
 * - Requires authenticated user
 * - Injects Header and shared layout structure
 *
 * This is a Server Component by design
 */
const Layout = async ({ children }: { children: React.ReactNode }) => {

    //  Retrieve the current session using request headers. Runs on the server before rendering any UI
    const session = await auth.api.getSession({
        headers: await headers()
    });
    // If no authenticated user is found, redirect to the sign-in page
    if (!session?.user) redirect('/sign-in');

    // Normalize user data before passing to client components. Keeps props small and predictable.
    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }

    return (
        <main className="min-h-screen text-gray-400">
            {/* Global header with authenticated user */}
            <Header user={user} />
            {/* Page content container */}
            <div className="container py-10">
                {children}
            </div>
        </main>
    )
};

export default Layout;