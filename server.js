const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/category') {
        // 确保 res 在回调内部使用
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true, code: 200 }))
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
      break

    case 'POST':
      if (parsedUrl.pathname === '/data') {
        let body = ''
        req.on('data', (chunk) => {
          body += chunk.toString()
        })
        req.on('end', () => {
          const data = JSON.parse(body)
          // 确保 res 在回调内部使用
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        })
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
      break

    case 'DELETE':
      if (parsedUrl.pathname.startsWith('/data/')) {
        const id = parsedUrl.pathname.split('/')[2]
        delete data[id] // 假设 data 是一个全局对象
        res.writeHead(204, { 'Content-Type': 'text/plain' })
        res.end()
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
      break

    default:
      res.writeHead(405, { 'Content-Type': 'text/plain' })
      res.end('Method Not Allowed')
  }
})

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001/')
})
