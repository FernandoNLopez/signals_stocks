'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";



export const signUpWithEmail = async (data : SignUpFormData) => {

    try {

        /*
        Make a call to BetterAuth to handle user creation, password hashing and session creation.
        BetterAuth will create a new user record in the MongoDB User Collection. It'll Hash the password and generate Store Session Tokens
        */
        const response = await auth.api.signUpEmail({
            body: {
                email: data.email,
                password: data.password,
                name: data.fullName
            }
        })

        /*
        If user creation is succesfull, we want to trigger the inggest background process.
        It'll sign the user in, then after a user successfully registered, we'll trigger the app user created event to do a background via inngest.
        */
        if (response) {
            //Send a new Event with the data provided by the form
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email: data.email,
                    name: data.fullName,
                    country: data.country,
                    investmentGoals: data.investmentGoals,
                    riskTolerance: data.riskTolerance,
                    preferredIndustry: data.preferredIndustry
                }
            })
        }

        return { success: true, data: response };

    } catch(e) {
        console.log('Sign Up Failed', e);
        return { success: false, error: 'Sign Up Failed' };
    }
};


export const signInWithEmail = async ({ email, password } : SignInFormData) => {

    try {
        const response = await auth.api.signInEmail({
            body: {
                email: email,
                password: password,
            }
        })
        return { success: true, data: response };

    } catch(e) {
        console.log('Sign in Failed', e);
        return { success: false, error: 'Sign in Failed' };
    }
};


export const signOut = async () => {

    try {
        /*
        Better Auth will handle the entire logout process by reading the session token from the http on cookie.
        It'll then remove the session from MongoDB session collection, clear out all the authentication logic, invalidate the session and then log out.
        */
        await auth.api.signOut({ headers: await headers() });

    } catch (error) {
        console.log('Sign Out Failed', error);
        return { success: false, error: 'Sign Out Failed' };
    }
}


