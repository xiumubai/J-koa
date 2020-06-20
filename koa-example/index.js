const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = {
    name: 'tom',
  }
})

app.listen(3000)
