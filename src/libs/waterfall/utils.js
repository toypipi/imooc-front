/**
 * 从 itemElement 中抽离出所有的 imgElements
 */

export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */

export const getAllImg = (imgElements) => {
  return imgElements.map((el) => el.src)
}

/**
 * 监听图片数组加载完成（promise）
 */

export const onCompleteImgs = (imgs) => {
  // promise 集合
  const promiseAll = []
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      // 处理 img 加载情况
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => resolve({ img, index })
    })
  })

  return Promise.all(promiseAll)
}
