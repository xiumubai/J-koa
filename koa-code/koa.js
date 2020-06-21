const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class Koa {
  constructor() {
    // 初始化中间件列表
    this.middlewares = []
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res)

      // 创建上下文
      const ctx = this.createContext(req, res)
      // this.callback(ctx)
      // 组合中间件
      const fn = this.compose(this.middlewares)
      await fn(ctx)

      res.end(ctx.body)
    })
    server.listen(...args)
  }

  // use(callback) {
  //   this.callback = callback
  // }

  use(middleware) {
    // 将中间件添加到列表中
    this.middlewares.push(middleware)
  }

  // 创建上下文
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    // 把原始的req和res全部挂载到ctx下面
    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res

    return ctx
  }

  // 添加compose
  compose(middlewares) {
    return function (ctx) {
      // 传入ctx上下文
      return dispatch(0)
      function dispatch(i) {
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          // 将上下⽂传⼊中间件，mid(ctx,next)
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = Koa
