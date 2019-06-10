/*
 * @Author: ll36
 * @Date: 2018/03/20 15:29
 * @Last Modified by: ll36
 * @Last Modified time: 2019-06-10 18:16:27
 * @Desc: 根据fmt格式,字符串类型的时间 */

/**
 * 日期格式化
 * @param {Date} date eg:'1990年12月1'，'1990-12-1'，'1990/12/1'，new Date()，时间戳
 * @param {string} fmt eg: yyyy/MM/dd，yyyy年M月d日 H:m:s，EEE，hh:mm:ss.SS a
 * @returns 根据fmt格式,字符串类型的日期时间
 */
function dateFormat(date, fmt) {
  if (!date || !fmt) {
    return ''
  }
  if (typeof date !== 'object') {
    // 将yyyy-MM-dd转化成yyyy/MM/dd（兼容IE）
    // 将yyyy年MM月dd日转化成yyyy/MM/dd
    date = !Number(date)
      ? date.replace(new RegExp(/(-|年|月)/gm), '/').replace('日', '/')
      : Number(date)
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
    'q+': Math.floor((date.getMonth() + 3) / 3) // 季度
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
  const apm = {
    a: ['am', 'pm'],
    A: ['AM', 'PM'],
    aa: ['上', '下'],
    AA: ['上午', '下午']
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
  if (/(S+)/.test(fmt)) {
    let millSeconds = date.getMilliseconds()
    if (RegExp.$1.length > 1) {
      millSeconds =
        millSeconds > 99
          ? millSeconds
          : (millSeconds > 9 ? '0' : '00') + millSeconds
    }
    fmt = fmt.replace(RegExp.$1, millSeconds)
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  // 防止M被上面当月份处理
  if (/(a+)/.test(fmt) || /(A+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, apm[RegExp.$1][date.getHours() >= 12 ? 1 : 0])
  }
  return fmt
}

/**
 * 时间格式化
 * @param {number/string} time 单位秒 （大于0，小于30天转化的秒）
 * @param {string} fmt eg: hh:mm:ss H M S
 * @returns 根据fmt格式,字符串类型的时间
 */
export const timeFormat = (time, fmt) => {
  const maxDates = 30
  let date = ''
  if (!time || !fmt) {
    return ''
  }
  if (Number(time)) {
    time = Number(time)
    if (!time || time < 0 || time > maxDates * 24 * 60 * 60) return time
    date = new Date('2019/1/1').getTime() + time * 1000
  } else if (/^\w+:\w+:\w+$/.test(time)) {
    date = new Date('2019/1/1' + ' ' + time).getTime()
    if (!date) return time
  }
  // console.log('date', date)
  let result = dateFormat(date, 'd:H:m:s')
  // console.log('result', result)
  if (!/^\w+:\w+:\w+:\w+$/.test(result)) return time
  result = result.split(':').map(i => Number(i))
  // console.log(result)
  const o = {
    'd+': result[0] - 1, // 日
    'h+': result[1], // 小时
    'm+': result[2], // 分
    's+': result[3] // 秒
  }
  // console.log('o', o)
  const p = {
    'H+': o['d+'] * 24 + o['h+'], // 小时
    'M+': (o['d+'] * 24 + o['h+']) * 60 + o['m+'], // 分
    'S+': ((o['d+'] * 24 + o['h+']) * 60 + o['m+']) * 60 + o['s+'] // 秒
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      )
    }
  }
  for (const k in p) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, p[k])
    }
  }
  return fmt
}

export default dateFormat
