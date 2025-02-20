import { OSS } from 'ali-oss'
import { getSts } from '@/api/sys'
import { REGION, BUCKET } from '@/constants'

/**
 * 获取 OSS 上传凭证
 * 此处仅为演示,模拟接口并不能真的拿到阿里上传凭证,需要根据自己情况修改
 */
export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    // bucket 所在区域
    region: REGION,
    // id
    accessKeyId: res.Credentials.AccessKeyId,
    // secret
    accessKeySecret: res.Credentials.AccessKeySecret,
    // token
    stsToken: res.Credentials.SecurityToken,
    // bucket
    bucket: BUCKET,
    // 刷新 token
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    // 刷新 token 的间隔时间
    refreshSTSTokenInterval: 1000 * 5
  })
}
