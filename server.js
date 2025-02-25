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
      } else if (parsedUrl.pathname === '/user/profile') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              nickname: '哪吒',
              regTime: '2022-02-25T01:44:34.774Z',
              avatar:
                'https://img1.baidu.com/it/u=2026386475,2001905621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
              _id: '621834c3321e0a091c994ee0',
              username: 'LGD_Sunday',
              title: '莲花童子',
              company: '天庭',
              homePage: 'https://www.nezha.com',
              introduction:
                '嘿，我是哪吒，托塔天王李靖的三儿子，一个脚踩风火轮、手持乾坤圈的少年英雄，虽历经磨难，却始终心怀正义，不畏强权，誓要守护这世间公平与安宁！',
              __v: 0,
              vipLevel: 1
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
      } else if (parsedUrl.pathname === '/user/sts') {
        // 获取阿里云STS临时凭证
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: {
              RequestId: '',
              AssumedRoleUser: {
                Arn: '',
                AssumedRoleId: ''
              },
              Credentials: {
                AccessKeyId: '',
                AccessKeySecret: '',
                Expiration: '',
                SecurityToken: ''
              }
            }
          })
        )
      } else if (parsedUrl.pathname === '/user/vip/pay/list') {
        // 获取 VIP 支付列表
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            code: 200,
            message: 'success',
            data: [
              {
                id: 0,
                title: '连续包月',
                desc: '次月 ￥19 续费，可随时取消',
                oldPrice: '29',
                price: '19'
              },
              {
                id: 1,
                title: '连续包年',
                desc: '次月 ￥198 续费，可随时取消',
                oldPrice: '258',
                price: '198'
              },
              {
                id: 2,
                title: '连续包季',
                desc: '次月 ￥53 续费，可随时取消',
                oldPrice: '68',
                price: '53'
              },
              {
                id: 3,
                title: '月卡',
                desc: '',
                oldPrice: '39',
                price: '29'
              },
              {
                id: 4,
                title: '季卡',
                desc: '',
                oldPrice: '79',
                price: '68'
              },
              {
                id: 5,
                title: '年卡',
                desc: '',
                oldPrice: '298',
                price: '258'
              }
            ]
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
      } else if (parsedUrl.pathname === '/sys/register') {
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
            data: {},
            message: '注册成功'
          }
          // 确保 res 在回调内部使用
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(data))
        })
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
      break
    case 'PUT':
      if (parsedUrl.pathname.startsWith('/user/profile')) {
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
          res.writeHead(200, { 'Content-Type': 'application/json' })
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
