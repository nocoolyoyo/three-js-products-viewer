const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const app = new Koa()

const main = serve(path.join(__dirname))

app.on('error', (err, ctx) =>
	console.error('server error', err)
)

app.use(main)
app.listen(8099)