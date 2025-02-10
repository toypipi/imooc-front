/**
 * 用户名的表单校验
 * @param {*} val 输入的内容
 * @return true 表示校验通过，false表示校验不通过，string 为提示消息
 */
export const validateUsername = (val) => {
  if (!val) {
    return '用户名不能为空'
  }
  if (val.length < 3 || val.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}
/**
 * 密码的表单校验
 */
export const validatePassword = (val) => {
  if (!val) {
    return '密码不能为空'
  }
  if (val.length < 6 || val.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}
