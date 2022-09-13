import { MongoClient, Db, Collection } from 'mongodb';
import * as models from "./model";

declare global {
    var mongo: Db
    var collections: {
        games: Collection<models.Game>,
        stats: Collection<models.Stat>,
        achievements: Collection<models.Achievement>,
        users: Collection<models.User>,
    }
}

export async function connectToDatabase() {
    if (!process.env.MONGO_URL || !process.env.MONGO_DBN) {
        console.error("Unknown mongo information");
        return false;
    }

    const client: MongoClient = new MongoClient(process.env.MONGO_URL!);
    try {
        await client.connect();
    } catch (e: any) {
        console.error(e?.message || e);
        return false;
    }

    const db: Db = client.db(process.env.MONGO_DBN);

    global.collections = {
        games: db.collection("games"),
        stats: db.collection("stats"),
        achievements: db.collection("achievements"),
        users: db.collection("users"),
    }
    global.mongo = db;

    console.log(`Successfully connected to MongoDB: ${db.databaseName}`);
    return true;
}