/*
 * @Author: ll36
 * @Date: 2018/03/20 15:29
 * @Last Modified by: ll36
 * @Last Modified time: 2019-04-22 20:12:11
 * @Desc: 根据fmt格式,字符串类型的时间 */

/**
 * 时间格式化
 * @param {Date} date eg:['1990年12月1','1990-12-1','1990/12/1',new Date(),时间戳]
 * @param {string} fmt eg: (yyyy/MM/dd)
 * @returns 根据fmt格式,字符串类型的时间
 */
function dateFormat(date, fmt) {
  if (!date) {
    return ''
  }
  if (typeof date !== 'object') {
    // 将yyyy-MM-dd转化成yyyy/MM/dd（兼容IE）
    // 将yyyy年MM月dd日转化成yyyy/MM/dd
    date =
      typeof date === 'string'
        ? date.replace(new RegExp(/(-|年|月)/gm), '/').replace('日', '/')
        : date
    const newDate = new Date(date)
    if (newDate.getDate()) {
      // 判断是否转成功
      date = newDate
    } else {
      return date
    }
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '星期' : '周') : '') +
        week[`${date.getDay()}`]
    )
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  return fmt
}
export default dateFormat
