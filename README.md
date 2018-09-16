# Mode

Quick setup scaffolding for an Express server

## Install

```sh
npm -i --save @conjurelabs/mode
```

## Usage

Add a directory of routes, in `./routes` within your project root.

```js
const mode = require('@conjurelabs/mode')
mode()
```

This will run an Express sever on `:3000`

See [the route module documenation](https://github.com/ConjureLabs/route#readme) for more deatils on using routes.

Routes within a `mode` server can access the `route` module via `@conjurelabs/mode/route`.

```js
// within './routes/test/get.js'
const Route = require('@conjurelabs/mode/route')

const route = new Route()

route.push(async (req, res) => {
  res.send('Hello')
})

module.exports = route

// this will allow a user to GET /test on the running server
```

See [a working example](https://github.com/ConjureLabs/mode/tree/master/example).

## Advanced Usage

### Name

You can set a more specific name for your server. This makes logs more sensical when dealing with multiple servers.

```js
mode({
  name: 'API'
})
```

### Routes Directory

By default `mode` will crawl routes at `./routes` within the project root. You can override that.

```js
mode({
  routesDir: '/custom/routes/dir'
})
```

### Port

By default `mode` runs on port `3000`

```js
mode({
  port: 4400
})
```

### Adding more Express configuration

After `mode` finishes configuring the express server, you can add your own addidtional config.

```js
mode({
  serverAfterConfig: (server, express) => {
    server.use(express.static('public'))
    server.use(passport.initialize())
    server.use(passport.session())
  }
})
```

### Appending dynamic routes

You may want to add more than what's in your routes directory.

```js
mode({
  serverAfterRoutes: (server, express) => {
    const robotsRouter = express.Router()
    robotsRouter.get('/robots.txt', (req, res) => {
      res.set('Content-Type', 'text/plain')
      res.send(['User-agent: *', 'Disallow: /admin'].join('\n'))
    })
    server.use(robotsRouter)
  }
})
```

### Before server starts

This is useful for wrapping `.listen` with additional logic, like when wrapping Express in a [Next](https://github.com/zeit/next.js#readme) app.

```js
mode({
  beforeListen: (server, express, done) => {
    // start next app
    nextApp
      .prepare()
      .then(done)
  }
})
```

### After server starts

```js
mode({
  afterListen: (server, express) => {
    // ...
  }
})
```
