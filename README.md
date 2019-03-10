# Express Abridged

Quick setup scaffolding for an Express server

## Install

```sh
npm -i --save @conjurelabs/route @conjurelabs/utils @conjurelabs/express-abridged
```

## Usage

Add a directory of routes, in `./routes` within your project root.

```js
const abridged = require('@conjurelabs/express-abridged')
abridged()
```

This will run an Express sever on `:3000`

See [the route module documenation](https://github.com/ConjureLabs/route#readme) for more deatils on using routes.

Routes within a `abridged` server can access the `route` module via `@conjurelabs/express-abridged/route`.

```js
// within './routes/test/get.js'
const Route = require('@conjurelabs/express-abridged/route')

const route = new Route()

route.push(async (req, res) => {
  res.send('Hello')
})

module.exports = route

// this will allow a user to GET /test on the running server
```

See [a working example](https://github.com/ConjureLabs/express-abridged/tree/master/example).

## Advanced Usage

### Name

You can set a more specific name for your server. This makes logs more sensical when dealing with multiple servers.

```js
abridged({
  name: 'API'
})
```

### Routes Directory

By default `abridged` will crawl routes at `./routes` within the project root. You can override that.

```js
abridged({
  routesDir: '/custom/routes/dir'
})
```

### Port

By default `abridged` runs on port `3000`

```js
abridged({
  port: 4400
})
```

### Adding more Express configuration

After `abridged` finishes configuring the express server, you can add your own addidtional config.

```js
abridged({
  serverAfterConfig: (server, express) => {
    server.use(express.static('public'))
    server.use(passport.initialize())
    server.use(passport.session())
  }
})
```

### Before server starts

This is useful for wrapping `.listen` with additional logic, like when wrapping Express in a [Next](https://github.com/zeit/next.js#readme) app.

```js
abridged({
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
abridged({
  afterListen: (server, express) => {
    // ...
  }
})
```
