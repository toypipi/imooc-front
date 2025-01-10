const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  switch (req.method) {
    case 'GET':
      if (parsedUrl.pathname === '/category') {
        // 确保 res 在回调内部使用
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              categories: [
                {
                  id: 'web_app_icon',
                  name: 'UI/UX',
                  col: 1,
                  urlname: 'web_app_icon'
                },
                {
                  id: 'design',
                  name: '平面',
                  col: 1,
                  urlname: 'design'
                },
                {
                  id: 'illustration',
                  name: '插画/漫画',
                  col: 1,
                  urlname: 'illustration'
                },
                {
                  id: 'photography',
                  name: '摄影',
                  col: 2,
                  urlname: 'photography'
                },
                { id: 'games', name: '游戏', urlname: 'games' },
                { id: 'anime', name: '动漫', urlname: 'anime' },
                {
                  id: 'industrial_design',
                  name: '工业设计',
                  col: 2,
                  urlname: 'industrial_design'
                },
                {
                  id: 'architecture',
                  name: '建筑设计',
                  urlname: 'architecture'
                },
                { id: 'art', name: '人文艺术', urlname: 'art' },
                { id: 'home', name: '家居/家装', col: 1, urlname: 'home' },
                {
                  id: 'apparel',
                  name: '女装/搭配',
                  col: 1,
                  urlname: 'apparel'
                },
                { id: 'men', name: '男士/风尚', col: 2, urlname: 'men' },
                {
                  id: 'modeling _hair',
                  name: '造型/美妆',
                  urlname: 'modeling hair'
                },
                { id: 'diy_crafts', name: '手工/布艺', urlname: 'diy_crafts' },
                { id: 'food drink', name: '美食', urlname: 'food drink' },
                { id: 'travel_places', name: '旅行', urlname: 'travel_places' },
                {
                  id: 'wedding_events',
                  name: '婚礼',
                  col: 2,
                  urlname: 'wedding_events'
                },
                { id: 'kids', name: '儿童', urlname: 'kids' },
                { id: 'pets', name: '宠物', urlname: 'pets' },
                { id: 'quotes', name: '美图', urlname: 'quotes' },
                { id: 'people', name: '明星', urlname: 'people' },
                { id: 'beauty', name: '美女', urlname: 'beauty' }
              ]
            }
          })
        )
      } else if (parsedUrl.pathname === '/pexels/list') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              page: '1',
              size: '20',
              total: 533,
              // 课程中该接口返回的数据格式
              list: [
                {
                  author: '',
                  authorLike: '',
                  avatar: '',
                  id: '',
                  photo: '',
                  photoDownLink: '',
                  photoHeight: 625,
                  photoLink: '',
                  photoType: '',
                  photoWidth: 500,
                  tags: ['all', 'home', 'desire', 'pets'],
                  title: '图片数据来自 pexels',
                  __v: 0,
                  _id: ''
                }
              ]
            }
          })
        )
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
