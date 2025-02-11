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
      } else if (parsedUrl.pathname === '/pexels/hint') {
        // 此接口模拟了搜索提示接口，假设输入为123，则返回的数据为['123', '1234', '12345']
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              total: 4,
              // 课程中该接口返回的数据格式
              result: [
                '12306',
                '123',
                '1234',
                '12345',
                '1234567',
                '112233',
                '15468',
                '41568',
                '51167',
                '55581'
              ]
            }
          })
        )
      } else if (parsedUrl.pathname === '/pexels/themes') {
        // 获取推荐主题
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              themes: [
                {
                  id: 'food photography',
                  photo:
                    'https://images.pexels.com/photos/459335/pexels-photo-459335.jpeg?auto=compress&cs=tinysrgb&h=130',
                  title: 'food photography'
                },
                {
                  id: 'Art',
                  photo:
                    'https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&h=130',
                  title: 'Art'
                },
                {
                  id: 'Afternoon tea',
                  photo:
                    'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&h=130',
                  title: 'Afternoon tea'
                },
                {
                  id: 'Portrait Photography',
                  photo:
                    'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&h=13',
                  title: 'Portrait Photography'
                },
                {
                  id: 'Care',
                  photo:
                    'https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg?auto=compress&cs=tinysrgb&h=13',
                  title: 'Care'
                },
                {
                  id: 'black theme',
                  photo:
                    'https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg?auto=compress&cs=tinysrgb&h=13',
                  title: 'black theme'
                },
                {
                  id: 'nature photography',
                  photo:
                    'https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg?auto=compress&cs=tinysrgb&h=13',
                  title: 'nature photography'
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
      if (parsedUrl.pathname === '/sys/captcha') {
        // 声明一个变量 body，并将其初始化为空字符串。这个变量将用于存储接收到的请求数据
        let body = ''
        // 为请求对象 req 添加一个事件监听器，监听 data 事件。每当有数据块（chunk）到达时，这个回调函数就会被调用。
        req.on('data', (chunk) => {
          // 拼接接收到的数据
          body += chunk.toString()
        })
        console.log(body)
        req.on('end', () => {
          const data = {
            success: true,
            code: 200,
            data: true,
            message: '验证成功'
          }
          // 确保 res 在回调内部使用
          res.writeHead(201, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        })
      } else if (parsedUrl.pathname === '/sys/login') {
        // 声明一个变量 body，并将其初始化为空字符串。这个变量将用于存储接收到的请求数据
        let body = ''
        // 为请求对象 req 添加一个事件监听器，监听 data 事件。每当有数据块（chunk）到达时，这个回调函数就会被调用。
        req.on('data', (chunk) => {
          // 拼接接收到的数据
          body += chunk.toString()
        })
        console.log(body)
        req.on('end', () => {
          const data = {
            success: true,
            code: 200,
            data: { token: 'f74dc635-f9dc-4ded-b1b8-4466e79e9c48' },
            message: '登录成功'
          }
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
