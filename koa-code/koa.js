const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class Koa {
  listen(...args) {
    const server = http.createServer((req, res) => {
      // this.callback(req, res)
      const ctx = this.createContext(req, res)
      this.callback(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }
  use(callback) {
    this.callback = callback
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
}

module.exports = Koa
