const Koa = require('./koa')
const Router = require('./router')
const static = require('./static')
const app = new Koa()
const router = new Router()
// app.use((req, res) => {
//   console.log(req, res)
//   res.writeHead(200)
//   res.end('Hi koa!')
// })

// app.use((ctx) => {
//   console.log(ctx.body)
//   ctx.body = 'Hi koa!'
// })

// function delay() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, 300)
//   })
// }

// app.use(async (ctx, next) => {
//   ctx.body = '1'
//   await next()
//   ctx.body += '5'
// })

// app.use(async (ctx, next) => {
//   ctx.body += '2'
//   await delay()
//   await next()
//   ctx.body += '4'
// })
// app.use(async (ctx, next) => {
//   ctx.body += '3'
// })

router.get('/index', async (ctx) => {
  console.log('index,xx')
  ctx.body = 'index page'
})
router.get('/post', async (ctx) => {
  ctx.body = 'post page'
})
router.get('/list', async (ctx) => {
  ctx.body = 'list page'
})
router.post('/index', async (ctx) => {
  ctx.body = 'post page'
})

app.use(router.routes())
app.use(static(__dirname + '/public'))

app.listen(3000, () => {
  console.log('app server is running in 3000!')
})
