'use server';


import {connectToDatabase} from "@/database/mongoose";
import {Error} from "mongoose";

export const getAllUsersForNewsEmail = async () => {

    try {
        /* get access to the DB*/
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('No database connection provided. Mongoose connection not connected.');

        /* Fetch all the users */
        const users = await db.collection('user').find(
            { email: { $exists: true, $ne: null } },
            { projection: { _id: 1, id: 1, email: 1, name: 1, country: 1 } },
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || user._id?.toString() || '',
            email: user.email,
            name: user.name
        }))

    } catch (e) {
        console.error('Error fetching users for news email: ', e);
        return [];
    }
}