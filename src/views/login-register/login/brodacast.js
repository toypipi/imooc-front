// 处理跨页面通讯的模块
// Key
const LOGIN_SUCCESS_CHANNEL = 'LOGIN_SUCCESS_CHANNEL'

let brodacastChannel = null

if (window.brodacastChannel) {
  brodacastChannel = new BroadcastChannel(LOGIN_SUCCESS_CHANNEL)
}

/**
 * 等待回调
 */
const wait = (callback) => {
  return new Promise((resolve, reject) => {
    if (brodacastChannel) {
      brodacastChannel.onmessage = (event) => {
        resolve(event.data)
      }
    } else {
      window.onstorage = (event) => {
        if (event.key === LOGIN_SUCCESS_CHANNEL) {
          resolve(JSON.parse(event.newValue))
        }
      }
    }
  })
}
/**
 * 发送消息
 */

const send = (data) => {
  if (brodacastChannel) {
    brodacastChannel.postMessage(data)
  } else {
    localStorage.setItem(LOGIN_SUCCESS_CHANNEL, JSON.stringify(data))
  }
}

/**
 * 销毁
 */
const clear = () => {
  if (brodacastChannel) {
    brodacastChannel.close()
    brodacastChannel = null
  } else {
    localStorage.removeItem(LOGIN_SUCCESS_CHANNEL)
  }
}

export default { wait, send, clear }
