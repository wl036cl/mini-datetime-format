import dateFormat, { timeFormat } from './index'

describe('dateFormat', () => {
  test('returns empty string when date or fmt missing', () => {
    expect(dateFormat('', 'yyyy/MM/dd')).toBe('')
    expect(dateFormat(new Date(), '')).toBe('')
  })

  test('formats yyyy/MM/dd from string date', () => {
    const result = dateFormat('1990-12-01', 'yyyy/MM/dd')
    expect(result).toBe('1990/12/01')
  })

  test('parses ISO 8601 with timezone offset', () => {
    const result = dateFormat('2026-02-03T09:58:51+08:00', 'yyyy/MM/dd')
    expect(result).toBe('2026/02/03')
  })

  test('parses slash-based ISO-like string with timezone offset', () => {
    const result = dateFormat('2026/02/03T09:58:51+08:00', 'yyyy/MM/dd')
    expect(result).toBe('2026/02/03')
  })

  test('returns input when date string cannot be parsed', () => {
    const bad = 'not-a-date'
    const result = dateFormat(bad, 'yyyy/MM/dd')
    expect(result).toBe(bad)
  })

  test('supports week day and am/pm tokens', () => {
    const result = dateFormat('2020/10/21 09:05:07', 'E a')
    expect(result).toBe('三 am')
  })

  test('supports week day and am/pm tokens', () => {
    const result = dateFormat('2020/10/21 19:05:07', 'EEE A')
    expect(result).toBe('星期三 PM')
  })
})

describe('timeFormat', () => {
  test('returns empty string when time or fmt missing', () => {
    expect(timeFormat('', 'hh:mm:ss')).toBe('')
    expect(timeFormat(60, '')).toBe('')
  })

  test('formats seconds into hh:mm:ss', () => {
    const result = timeFormat(3661, 'hh:mm:ss')
    expect(result).toBe('01:01:01')
  })

  test('supports time string with hours >= 24', () => {
    const result = timeFormat('25:00:00', 'd hh:mm:ss')
    expect(result).toBe('1 01:00:00')
  })

  test('supports minute-based format token M', () => {
    const result = timeFormat('90:30', 'M')
    expect(result).toBe('90')
  })
})
