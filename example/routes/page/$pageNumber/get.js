const Route = require('@conjurelabs/express-abridged/route')

const route = new Route()

route.push(async (req, res) => {
  const { pageNumber } = req.params

  res.send(`
    <body>
      <h1>Page ${pageNumber}</h1>
      <a href='/'>Home</a>
    </body>
  `)
})

module.exports = route