const Koa = require('koa')
// 注意：require('koa-router')返回的是函数
const router = require('koa-router')()

const app = new Koa()

router.get('/home/:name', async (ctx, next) => {
  console.log(ctx)
  const name = ctx.params.name
  ctx.body = `<h1>Hello, ${name}!</h1>`
})

app.use(router.routes())
app.listen(3000)
console.log('app started at port 3000...')
