const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const {createServices} = require('./services')

/** @module web */

const getReqService = (req, serviceId) => req.app.get('services')[serviceId]

/**
 * Creates a new router instance.
 * @returns {external:express.Router}
 * @memberof module:web
 */
const createRouter = () => new express.Router()
    .get('/api/rest/post', (req, res) => {
        getReqService(req, 'posts').list().toArray().then(res.send.bind(res))
    })
    .post('/api/rest/post', bodyParser.json(), (req, res) => {
        getReqService(req, 'posts').create(req.body).then(res.send.bind(res))
    })
    .get('/', (req, res) => res.render('index'))

/**
 * Default router.
 * @type {external:express.Router}
 * @memberof module:web
 */
const defaultRouter = createRouter()

/**
 * Web object.
 * @typedef Web
 * @prop {external:express.Application} app Express application reference.
 * @prop {external:http.Server} server HTTP server reference.
 */

/**
 * Creates a new web object.
 * @param {object} opts
 * @param {external:mongodb.Database} opts.db
 * @param {external:express.Router} [opts.router] Custom router.
 * @return {module:web~Web}
 * @memberof module:web
 */
const createWeb = ({db, router}) => {
    return createServices({db})
        .then(services => {
            const app = express()
            app.set('services', services)
            app.set('port', process.env.PORT || 3000)
            app.set('view engine', 'pug')
            app.use(router || defaultRouter)

            const server = http.createServer(app)

            return {app, server}
        })
}

/**
 * Starts the web object.
 * @return {module:web~Web}
 * @memberof module:web
 */
const startWeb = (web) => {
    return new Promise((resolve, reject) => {
        web.server.on('error', reject).listen(web.app.get('port'), resolve.bind(null, web))
    })
}

module.exports = {
    getReqService,
    createRouter,
    defaultRouter,
    createWeb,
    startWeb,
}
