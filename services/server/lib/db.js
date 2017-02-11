/** @module db */

const mongodb = require('mongodb')

/**
 * Creates a new mongodb client.
 * @returns {external:mongodb.MongoClient}
 * @memberof module:db
 */
const createClient = () => Promise.resolve(new mongodb.MongoClient())

/**
 * Connects the client to channel database.
 * @param {external:mongodb.MongoClient} client
 * @returns {external:Promise}
 * @memberof module:db
 */
const connectClient = (client) => client.connect('mongodb://channel_db/channel')

module.exports = {
    createClient,
    connectClient,
}
