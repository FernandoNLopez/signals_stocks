import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/*allowing this mongoose Cache to exist. Using this global Cache when it reloads in development doesn´t create a new connection
whenever we make a new request to MongoDB. Rather it'll be taken    */
declare global {
    var mongooseCache: { //to have access to a connection variable
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

/*
if there isn't cache, make it equal to empty connection and an empty promise.
next.js server actions re-trigger or re-start for every new action that we make. So we don´t want to recreate new connections
every time. Rather we want to re-use the sames.
* */
if (!cached){
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {

    //stores the connection in a global caché, so it doesn't keep opening duplicates
    if (!MONGODB_URI) throw new Error('MongoDB URI is required. Must be set within .env'); //check if we have access to MongoDB URI

    //if connection already exist it returns it inmediately
    if (cached.conn) return cached.conn;
    //if not, it creates a new one by calling mongoose.connect and then saves it in the cache
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {

        cached.conn = await cached.promise;

    } catch (err) {
        //if connection fails, it clears the caché so retries can happen properly.
        cached.promise = null;
        throw err;
    }
    //To know when we are on development mode or production
    console.log(`Connected to database... ${process.env.NODE_ENV} | ${MONGODB_URI}`);

    return cached.conn;
}

