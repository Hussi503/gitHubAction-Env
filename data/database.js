import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log('Trying to connect to db');

let database = null;

export async function getDatabase() {
  if (database) return database; // Return cached instance if already connected

  try {
    await client.connect();  // Wait for connection
    await client.db(dbName).command({ ping: 1 });
    console.log('Connected successfully to server');
    database = client.db(dbName);
    return database;
  } catch (error) {
    console.log('Connection failed.', error);
    await client.
