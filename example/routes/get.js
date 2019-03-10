const Route = require('@conjurelabs/express-abridged/route')

const route = new Route()

route.push(async (req, res) => {
  res.send(`
    <body>
      <h1>Homepage</h1>
      <a href='/page/1'>Page 1</a>
      <a href='/page/2'>Page 2</a>
    </body>
  `)
})

module.exports = route