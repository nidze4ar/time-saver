import { cloneDeep } from './tools'
import { 
  dysplaySchedule,
  decreaseTaskLabour, 
  increaseFreeTime, 
  floodSchedule,
  sameStartFlood,
  accumFlood,
  splitFlood
 } from './middleware'
import { diffTime, demountTime, time_estimate} from './time_methods'
import { prepareDate, addDays, getDate, monthsDay, months, dExt } from './date_methods'
import { default_weekends } from './patterns'

// заполнение календаря при первом запуске
export const fill_calendar = (weekdays, weekends) => {  
  const fillObject = year => {
    let obj = {};
    for (let i = 0, len = 12; i < len; i++) {    
      obj[months[i]] = new Array(year % 4 === 0 && i === 1 ? 29 : monthsDay[i]).fill(weekdays)
      for (let j = 0, len = obj[months[i]].length; j < len; j++) {
        let days = new Date(year, i, j).getDay()
          if(days === 5 || days === 6){
            obj[months[i]][j] = weekends
         }
       }      
     }
    return obj
  }
  let calendar = {}
  for (let i = 0, len = 7; i < len; i++) {     
    calendar[new Date().getFullYear() + i] = fillObject(new Date().getFullYear() + i)
  }  
  return calendar
}
// извлечение событий выбранного дня
export const schedule_render = (date, store) => {
  if(store.core.calendar[date.year]) {
    if(Array.isArray(getDate(store.core.calendar, date) ) ){
      return getDate(store.core.calendar, date) 
    } else {
      return default_weekends               
    }     
  }  
  return default_weekends                   
}

// отсрочка дедлайна задачи если свободного времени не хватает
const doPostponement = settings => {
  let d = prepareDate(settings.task.dedline), freeTime = 0, days = 0, now = addDays(d.start, -1)
  while(freeTime < settings.task.labour * 2) {  // may be 3?
    now = addDays(now, 1) 
    freeTime += time_estimate(getDate(settings.calendar, dExt(now) ) )
    days++
  }
  settings.info.console = 'Done:_postponemented_successfully'
  settings.info.dedlinePostponement = days
  settings.info.decisionErrorId = 0
  return settings
}
// достаточность времени для создании задачи
const checkFreeTime = arg => {
  let d = prepareDate(arg.task.dedline), res = 0, now = d.start
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    res += time_estimate(getDate(arg.calendar, dExt(now) ) )
  }
  return res > arg.task.labour  
}
//----------------------------------------------------------------------------------------------------------
// сквозное время (одиноковре на всем протяжении)
const checkThroughFreeTime = ({calendar, task}) => {
  let d = prepareDate(task.dedline) 
  let res = []
  let now = d.start
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    res.push(getDate(calendar, dExt(now) ) )   
  }  
  res = res.map(v => periodEstimate(v) ).map(v => v.filter(i => i.freeIime > task.labour / d.duration) )
  if(res.some(v => !v) ){
    return false
  } 
  return findThroughFreeTime(res, task.labour)
}
// массив начала и длительности периодов свободного времени
const periodEstimate = schedule => {                
  let acc = []  
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end) {
      acc.push({
        start: schedule[i-1].end,
        end: schedule[i].start,
        freeIime: demountTime(diffTime(schedule[i-1].end, schedule[i].start) )
      })
    }
  }  
  return acc
}
// поиск одновременных периодов 
const findThroughFreeTime = (arr, taskDuration) => { 
  let res = arr[0] , temp = arr[1]    
  for (let i = 1, len = arr.length - 1; i < len; i++) {
    res = res.filter(v => checkIintersectionPeriod(v, temp, taskDuration) )
    if(res){
      temp = arr[i + 1]
    } else {
      return false
    }
  }
  return res
}
// пересечение периодов time и одного из arr
const checkIintersectionPeriod = (time, arr, dur) => 
  !!(arr.filter(v => demountTime(diffTime(Math.min(v.start, time.start), Math.min(v.end, time.end) ) ) > dur
  || demountTime(diffTime(Math.min(v.start, time.start), Math.min(v.end, time.end) ) ) > dur))
//--------------------------------------------------------------------------------------------------------//

// распределение сложной задачи по календарю
export const prepareTaskSpread = arg => {
  let settings = cloneDeep(arg)
  if(!settings.task.dedline[0]._d){
    settings.info.console = 'Error_non_dedline'
    return settings
  }
  switch(settings.info.decisionErrorId) {
    // полная проверка свободного времени
    case 0: if(!checkFreeTime(settings) ) {
      settings.info.console = 'Error_free_time'
      return settings
    } else {
      return floodSchedule(settings)
    }
    // завершаем задачу 
    case 1: settings.info.console = 'Done:_abort_purpose'
      return settings
    // отсрочка дедлайна
    case 2: return doPostponement(settings)
    // увеличение свободного места
    case 3: return increaseFreeTime(settings)    
    // игнорировать недостаток свободного времени
    case 4: return floodSchedule(settings)
    // уменишить трудоемкость задачи
    case 5: return decreaseTaskLabour(settings)
    // записывать задачу раздельно в течении одного дня
    case 6: return splitFlood(settings)
    // проверка сквозного свободного времени 
  /*  case 7: if(!checkThroughFreeTime(settings) ) {
      settings.info.console = 'Error_throught_time'
      return settings
    }
    break
    // получение массива вариантов свободного сквозного времени 
    case 8: settings.info.troughTimes = checkThroughFreeTime({calendar: settings.calendar, task:settings.task})
      settings.info.console = 'Done:_through_times_is_recd'
      return settings */
    // заполнение сквозного времени 
    case 7: return dysplaySchedule(settings) 
    case 8: return sameStartFlood(settings)
    case 9: return accumFlood(settings)
    case 10: return splitFlood(settings)
    default: return settings
  }  
}


