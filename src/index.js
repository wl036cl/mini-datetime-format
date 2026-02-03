/*
 * @Author: ll36
 * @Date: 2018/03/20 15:29
 * @Last Modified by: ll36
 * @Last Modified time: 2020-10-21 09:55:23
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
    let _date = !Number(date)
      ? date.replace(new RegExp(/(-|年|月)/gm), '/').replace('日', '')
      : Number(date)
    _date = new Date(_date)
    if (_date.getDate()) {
      // 判断是否转成功
      date = _date
    } else {
      // 时间戳转化失败(再次尝试，ISO 8601)
      _date = new Date(date.replace(/\//g, '-'))
      if (_date.getDate()) {
        date = _date
      } else {
        // 时间戳转化失败，直接返回
        return date
      }
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
  }
  const week = {
    0: ['日', 'Sun', 'Sunday'],
    1: ['一', 'Mon', 'Monday'],
    2: ['二', 'Tues', 'Tuesday'],
    3: ['三', 'Wed', 'Wednesday'],
    4: ['四', 'Thur', 'Thursday'],
    5: ['五', 'Fri', 'Friday'],
    6: ['六', 'Sat', 'Saturday'],
  }
  const apm = {
    a: ['am', 'pm'],
    A: ['AM', 'PM'],
    aa: ['上', '下'],
    AA: ['上午', '下午'],
  }
  let re = /((y|Y)+)/;
  if (re.test(fmt)) {
    const t = re.exec(fmt)[1]
    fmt = fmt.replace(
      t,
      `${date.getFullYear()}`.substring(4 - t.length)
    )
  }
  re = /(S+)/;
  if (re.test(fmt)) {
    let millSeconds = date.getMilliseconds()
    const t = re.exec(fmt)[1]
    if (t.length > 1) {
      millSeconds =
        millSeconds > 99
          ? millSeconds
          : (millSeconds > 9 ? '0' : '00') + millSeconds
    }
    fmt = fmt.replace(t, millSeconds)
  }
  for (const k in o) {
    re = new RegExp(`(${k})`);
    if (re.test(fmt)) {
      const t = re.exec(fmt)[1];
      fmt = fmt.replace(
        t,
        t.length == 1 ? o[k] : `00${o[k]}`.substring(`${o[k]}`.length)
      )
    }
  }
  // 防止M被上面当月份处理
  re = /((a|A)+)/;
  if (re.test(fmt)) {
    const t = re.exec(fmt)[1];
    fmt = fmt.replace(t, apm[t][date.getHours() >= 12 ? 1 : 0])
  }
  // 防止星期英文字母被格式转换
  re = /(e+)/;
  if (re.test(fmt)) {
    const t = re.exec(fmt)[1];
    fmt = fmt.replace(
      t,
      week[`${date.getDay()}`][t.length > 1 ? 2 : 1]
    )
  }
  re = /(E+)/;
  if (re.test(fmt)) {
    const t = re.exec(fmt)[1];
    fmt = fmt.replace(
      t,
      (t.length > 1 ? (t.length > 2 ? '星期' : '周') : '') +
      week[`${date.getDay()}`][0]
    )
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
    let arr = time.split(':')
    let day = 0
    // 小时数大于或等于24
    if (arr[0] >= 24) {
      day = Math.floor(Number(arr[0] / 24))
      arr[0] = (Number(arr[0]) % 24).toString()
    }
    if (day > 0) {
      date = new Date(`2019/1/${day + 1} ${arr.join(':')}`).getTime()
    } else {
      date = new Date(`2019/1/1 ${time}`).getTime()
    }
    if (!date) return time
  } else if (/^\w+:\w+$/.test(time)) {
    let arr = time.split(':')
    let hour = 0
    // 分钟数大于或等于60（且得小于1440分钟，不然会超过1天）
    if (arr[0] >= 60) {
      hour = Math.floor(Number(arr[0] / 60))
      arr[0] = (Number(arr[0]) % 60).toString()
    }
    if (hour > 0) {
      date = new Date(`2019/1/1 ${hour}:${arr.join(':')}`).getTime()
    } else {
      date = new Date('2019/1/1' + ' 0:' + time).getTime()
    }
    if (!date) return time
  }
  // console.log('date', date)
  let result = dateFormat(date, 'd:H:m:s')
  if (!/^\w+:\w+:\w+:\w+$/.test(result)) return time
  result = result.split(':').map((i) => Number(i))
  // console.log(result)
  const o = {
    'd+': result[0] - 1, // 日
    'h+': result[1], // 小时
    'm+': result[2], // 分
    's+': result[3], // 秒
  }
  // console.log('o', o)
  const p = {
    'H+': o['d+'] * 24 + o['h+'], // 小时
    'M+': (o['d+'] * 24 + o['h+']) * 60 + o['m+'], // 分
    'S+': ((o['d+'] * 24 + o['h+']) * 60 + o['m+']) * 60 + o['s+'], // 秒
  }
  for (const k in o) {
    const re = new RegExp(`(${k})`);
    if (re.test(fmt)) {
      const t = re.exec(fmt)[1];
      fmt = fmt.replace(
        t,
        t.length == 1 ? o[k] : `00${o[k]}`.substring(`${o[k]}`.length)
      )
    }
  }
  for (const k in p) {
    const re = new RegExp(`(${k})`);
    if (re.test(fmt)) {
      const t = re.exec(fmt)[1];
      fmt = fmt.replace(
        t,
        t.length == 1 ? p[k] : `00${p[k]}`.substring(`${p[k]}`.length)
      )
    }
  }
  return fmt
}

export default dateFormat
