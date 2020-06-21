const Koa = require('./koa')
const app = new Koa()
app.use((req, res) => {
  console.log(req, res)
  res.writeHead(200)
  res.end('Hi koa!')
})

app.listen(3000, () => {
  console.log('app server is running in 3000!')
})
