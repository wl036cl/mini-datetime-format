import dateFormat, { timeFormat } from './index'
// 日期修改
const date = new Date()
test(
  '当前时间 格式为：yyyy年M月d日 EEE AA h:m:s.SS；结果：' +
    dateFormat(date, 'yyyy年M月d日 EEE AA h:m:s.SS'),
  () => {
    const week = {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六',
    }
    expect(dateFormat(date, 'yyyy年M月d日 EEE AA h:m:s.SS')).toBe(
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 星期${
        week[date.getDay()]
      } ${date.getHours() > 12 ? '下午' : '上午'} ${
        date.getHours() % 12
      }:${date.getMinutes()}:${date.getSeconds()}.${
        date.getMilliseconds() > 99
          ? date.getMilliseconds()
          : (date.getMilliseconds() > 9 ? '0' : '00') + date.getMilliseconds()
      }`
    )
  }
)
test(
  '2021-1-12 23:59:01 改格式为：yyyy/MM/dd HH:mm:ss；结果：' +
    dateFormat('2021-1-12 23:59:01', 'yyyy/MM/dd HH:mm:ss'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'yyyy/MM/dd HH:mm:ss')).toBe(
      '2021/01/12 23:59:01'
    )
  }
)
test(
  '2021-1-12 23:59:01 改格式为：yyyy-M-d A h:m:s；结果：' +
    dateFormat('2021-1-12 23:59:01', 'yyyy-M-d A h:m:s'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'yyyy-M-d A h:m:s')).toBe(
      '2021-1-12 PM 11:59:1'
    )
  }
)
test(
  '2021-1-12 23:59:01 改格式为：yyyy年M月d日 AA h:m:s EEE；结果：' +
    dateFormat('2021-1-12 23:59:01', 'yyyy年M月d日 AA h:m:s EEE'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'yyyy年M月d日 AA h:m:s EEE')).toBe(
      '2021年1月12日 下午 11:59:1 星期二'
    )
  }
)
test(
  '2021-1-12 23:59:01.009 获取当前秒；结果：' +
    dateFormat('2021-1-12 23:59:01:009', 's.SS'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01:009', 's.SS')).toBe('1.009')
  }
)
test(
  '2021-1-12 23:59:01.099 获取当前毫秒；结果：' +
    dateFormat('2021-1-12 23:59:01:099', 'S'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01:099', 'S')).toBe('99')
  }
)
test(
  '2021-1-12 23:59:01 获取当日上午/下午（a）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'a'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'a')).toBe('pm')
  }
)
test(
  '2021-1-12 23:59:01 获取当日上午/下午（A）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'A'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'A')).toBe('PM')
  }
)
test(
  '2021-1-12 23:59:01 获取当日上午/下午（aa）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'aa'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'aa')).toBe('下')
  }
)

test(
  '2021-1-12 23:59:01 获取当日上午/下午（AA）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'AA'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'AA')).toBe('下午')
  }
)
test(
  '2021-1-12 23:59:01 获取当日星期几（E）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'E'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'E')).toBe('二')
  }
)
test(
  '2021-1-12 23:59:01 获取当日星期几（EE）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'EE'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'EE')).toBe('周二')
  }
)
test(
  '2021-1-12 23:59:01 获取当日星期几（EEE）；结果：' +
    dateFormat('2021-1-12 23:59:01', 'EEE'),
  () => {
    expect(dateFormat('2021-1-12 23:59:01', 'EEE')).toBe('星期二')
  }
)

// 时间修改
test(
  '7799.011 改格式为h:m:s；结果：' + timeFormat('7799.011', 'h:m:s'),
  () => {
    expect(timeFormat('7799.011', 'h:m:s')).toBe('2:9:59')
  }
)
test(
  '7799.011 改格式为hh:mm:ss；结果：' + timeFormat('7799.011', 'hh:mm:ss'),
  () => {
    expect(timeFormat('7799.011', 'hh:mm:ss')).toBe('02:09:59')
  }
)

test(
  '47949 改格式为h:m:s；结果：' + timeFormat('47949', 'h:m:s'),
  () => {
    expect(timeFormat('47949', 'h:m:s')).toBe('13:19:9')
  }
)

test(
  '94199 改格式为d天 hh小时mm分钟ss秒；结果：' + timeFormat('94199', 'd天 hh小时mm分钟ss秒'),
  () => {
    expect(timeFormat('94199', 'd天 hh小时mm分钟ss秒')).toBe('1天 02小时09分钟59秒')
  }
)

test(
  '94199 改格式为H:mm:ss；结果：' + timeFormat('94199', 'H:mm:ss'),
  () => {
    expect(timeFormat('94199', 'H:mm:ss')).toBe('26:09:59')
  }
)

test(
  '94199 改格式为M:ss；结果：' + timeFormat('94199', 'M:ss'),
  () => {
    expect(timeFormat('94199', 'M:ss')).toBe('1569:59')
  }
)

test(
  '2:09:59 改格式为M:s；结果：' + timeFormat('2:09:59', 'M:s'),
  () => {
    expect(timeFormat('2:09:59', 'M:s')).toBe('129:59')
  }
)

test(
  '2:09:59 改格式为S；结果：' + timeFormat('2:09:59', 'S'),
  () => {
    expect(timeFormat('2:09:59', 'S')).toBe('7799')
  }
)