import {  betterAuth  } from "better-auth";
import {  mongodbAdapter  } from "better-auth/adapters/mongodb";
import {  nextCookies  } from "better-auth/next-js";

import {  connectToDatabase  } from "@/database/mongoose";

//singleton instance --> ensures that we only create one instance which prevents multiple connections and improves performance
//export an instance of authentication by calling betterAuth()
let authInstance : ReturnType<typeof betterAuth> | null = null;


// getAuth() returns a new instance of the authentication
export const getAuth = async () => {

    if (authInstance) return authInstance;

    // if authInstance doesn't exist we will establish a connection with MongoDB
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    //once we ensure the db connection is succesfull
    if (!db) throw new Error("MongoDB connection not found");

/*
we initialize a new AuthConnection instance  by calling BetterAuth() providing the configuration object
it'll automatically handle the User Collection Creation of MongoDB, it'll be handling the Sessions Collection for manage the accounts.
Automatically update the database schema thanks to MongoDB Adapter
*/
    authInstance = betterAuth({
        database: mongodbAdapter(db as any),
        secret: process.env.BETER_AUTH_SECRET,
        baseURL: process.env.BETER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disabledSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
        },
        plugins: [nextCookies()]
    });

    return authInstance;
};

export const auth = await getAuth();

