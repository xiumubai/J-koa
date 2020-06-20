// koa为了能够简化API，引⼊上下⽂context概念，将原始请求对象req和响应对象res封装并挂载到
// context上，并且在context上设置getter和setter，从⽽简化操作。

const Obj = {
  info: {
    name: 'janney',
  },
  get name() {
    return this.info.name
  },
  set name(value) {
    this.info.name = value
  },
}

console.log(Obj.name)

Obj.name = 'janney2'

console.log(Obj.name)
