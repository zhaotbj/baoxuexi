const Koa = require('koa');
const app = new Koa();
const path = require('path')
const static = require('koa-static');
const fs = require('fs')
const Router = require('koa-router')
const {getIPAdress,getFile} = require('./util')
let router = new Router()

// 快速入口
router.get("/", async(ctx) => {
    ctx.body= await getFile('./public/quickEnter.html')
})
// 办案
router.get("/handlingCases", async(ctx) => {
    const data = await getFile('./public/handlingCases/index.html')
    ctx.body =data
    app.use(static(__dirname + '/public/handlingCases'))
})
// 立案
router.get("/demo", async(ctx) => {
    const data = await getFile('./public/demo/index.html')
    ctx.body = data
    app.use(static(__dirname + '/public/demo'))
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000, function () {
    console.log(`listening on http://${getIPAdress()}:3000`)
})