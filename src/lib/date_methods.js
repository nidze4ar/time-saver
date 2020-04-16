import { cloneDeep } from './tools'
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const monthsDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const getDate = (cal, day) => {
  return day.month ?  cal[day.year][day.month][day.day - 1] :
  cal[day.getFullYear()][months[day.getMonth()]][day.getDate() - 1]
}
// извлечение даты из дедлайна
export const prepareDate = arr => {
  let tempDate = cloneDeep(arr)
    return {
      start: tempDate[0],
      end: tempDate[1],
      duration: daysLag(tempDate[1], tempDate[0])
    }
}
// длительность периода
export const daysLag = (momentA, momentB) => {
    if(momentA.diff){
      return momentA.diff(momentB, 'days')
    } else {
      return Math.ceil(Math.abs(dExt(momentB, 'date').getTime() - dExt(momentA, 'date').getTime()) / (1000 * 3600 * 24) )
    }
}
// перемещение по календарю
export const addDays = (moment, days) => {
  return moment._d ? new Date(dExt(moment, 'date').setDate(moment._d.getDate() + days) ) :
    new Date(moment.setDate(moment.getDate() + days) )
}
// извлечение даты из обтекта Moment
export const dExt = (date, res) => {
    if(!date._d){
      return date
    }
    let d = date._d.toString()  
    let result = {
      year: +d.slice(11, 15),
      month: d.slice(4, 7),
      day: +d.slice(8, 10),
    }
  return res === 'date' ? new Date(+result.year, months.indexOf(result.month), result.day) : result
}

export const buildIterDate = day => new Object({
  year: day.getFullYear(),
  month: day.getMonth(),
  day: day.getDate() - 1
})