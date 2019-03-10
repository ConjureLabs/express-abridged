const path = require('path')

module.exports = ({
  // name of server, useful for logging
  name = 'Server',
  // if false, then no route crawling will happen
  withRoutes = true,
  // dir in which base routes live in
  routesDir = path.resolve(__dirname, '../../../routes'),
  // port for express
  port = 3000,
  // takes in express server, can be used to apply additional .use
  serverAfterConfig = (server, express) => {},
  // run just before starting server
  beforeListen = (server, express, done) => done(),
  // run just after starting server
  afterListen = (server, express) => {}
}) => {
  require('@conjurelabs/utils/process/handle-exceptions')

  // base dependencies
  const express = require('express')
  const compression = require('compression')
  const morgan = require('morgan')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const helmet = require('helmet')

  const server = express()

  if (process.env.NODE_ENV !== 'production') {
    // this results in full stacktraces, when not in prod
    Error.stackTraceLimit = Infinity
  }

  // basic server config
  server.use(helmet())
  server.use(compression())
  server.set('port', port)
  server.use(morgan('combined'))

  server.use(bodyParser.urlencoded({
    extended: true
  }))
  server.use(bodyParser.json())
  server.use(cookieParser())

  serverAfterConfig(server, express)

  // tracking req attributes (like ip address)
  server.use((req, res, next) => {
    req.attributes = {} // used to track anything useful, along the lifetime of a request
    req.attributes.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    next()
  })

  // initialize routes
  if (withRoutes) {
    // routes crawling is sync - this is okay if run at startup
    const crawlRoutes = require('@conjurelabs/route/sync-crawl')
    const routes = crawlRoutes(routesDir)

    if (!routes.length) {
      throw new Error(`No routes given for ${name}`)
    }
    server.use(routes)
  }

  // starting server
  beforeListen(server, express, () => {
    server.listen(port, () => {
      console.info(`${name} available on :${port}`)
      afterListen(server, express)
    })
  })
}
