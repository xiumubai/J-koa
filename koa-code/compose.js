// 1.函数组合

// const add = (x, y) => x + y
// const square = (z) => z * z

// const fn = (x, y) => square(add(x, y))

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const fn = compose(add, square)

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach((fn) => {
//     console.log(fn)
//     ret = fn(ret)
//   })
//   return ret
// }
// const fn = compose(add, square, square)

// console.log(fn(1, 2))

// 2.异步中间件,洋葱圈模型

async function fn1(next) {
  console.log('start fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next) {
  console.log('start fn2')
  await delay()
  await next()
  console.log('end fn2')
}

async function fn3(next) {
  console.log('end fn3')
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

function compose(middlewares) {
  return function () {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1)
        })
      )
    }
  }
}

const middlewares = [fn1, fn2, fn3]
const fn = compose(middlewares)
fn()
