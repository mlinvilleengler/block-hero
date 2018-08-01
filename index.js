#!/usr/bin/env node
const app = require('./app')
const https = require('https')
const http = require('http')
const fs = require('fs')
const forceSsl = require('express-force-ssl')
const serverUtil = require('./server-util')
const tradeEngine = require('./services/tradeEngine')

const options = {
  key: fs.readFileSync('./encryption/key.pem'),
  cert: fs.readFileSync('./encryption/cert.pem')
}

const port = serverUtil.normalizePort(process.env.PORT || '443')
app.set('port', port)
app.use(forceSsl)

const httpsServer = https.createServer(options, app)
httpsServer.listen(port)
httpsServer.on('error', serverUtil.onError)
httpsServer.on('listening', () => serverUtil.onListening(httpsServer))

const httpServer = http.createServer(app).listen(8000)
httpServer.on('error', serverUtil.onError)
httpServer.on('listening', () => serverUtil.onListening(httpServer))

tradeEngine.start()
