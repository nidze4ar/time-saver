import { compressGap, compressTask, permutationTask, markStartFreeTime, buildTask } from './task_methods'
import { detail_estimate, formTime, diffTime } from './time_methods'
import { prepareDate, addDays, buildIterDate, months } from './date_methods'

const universalCalendarMiddleWare = (set, func) => {
  let d = prepareDate(set.task.dedline), now = addDays(d.start, -1)
  set.info.tempNum = 0
  set.info.tempArr = []  
  for (let i = -1, len = d.duration; i < len; i++) {
    now = addDays(now, 1)
    set.info.dateTrack = buildIterDate(now)
    func(set.calendar[now.getFullYear()][months[now.getMonth()]][now.getDate() - 1], set)
  }
  return set
}

const runDysplaySchedule = (schedule, set) => {  
  set.info.tempArr.push(detail_estimate(schedule) )  
  if(set.info.console !== 'Done:_dysplaySchedule') {
    set.info.console = 'Done:_dysplaySchedule'
  }  
}

const runDecreaseTaskLabour = (schedule, set) => {
  if(typeof detail_estimate(schedule) === 'object') {
    let maxGap = Math.max(...detail_estimate(schedule) )
    set.info.tempNum = set.info.tempNum + maxGap / 100
    set.task.labour = Math.round(set.info.tempNum)
    set.info.console = 'Done:_decreaseTaskLabour'
  }
}

const runIncreaseFreeTime = (schedule, set) => {
  const runExcludeTask = arr => set.ux.aggressivenessExclude ? arr.filter(task => task.exclusivity === false) : arr,
  runCompressTask = arr => set.ux.aggressivenessSqueezing ? compressTask(arr, set.ux.compressionRatio) : arr,
  runCompressGap = arr => set.ux.aggressivenessSqueezing ? compressGap(arr) : arr,
  runPermutationTask = arr => set.ux.aggressivenessPermutation ? permutationTask(arr) : arr
  set.calendar[set.info.dateTrack.year][months[set.info.dateTrack.month]][set.info.dateTrack.day] = 
  runPermutationTask(runCompressGap(runCompressTask(runExcludeTask(schedule) ) ) )
  if(set.info.console !== 'Done:_increaseFreeTime') {
    set.info.console = 'Done:_increaseFreeTime'
  }
}

const runFloodSchedule = (schedule, set) => {
  const date = set.info.dateTrack
  const start = markStartFreeTime(schedule, formTime(Math.max(...detail_estimate(schedule) ) ) ) 
  set.calendar[date.year][months[date.month]][date.day] = [...schedule, buildTask(set.task, start, set.task.labour)]
  set.info.console = ''
/*  if(set.info.console !== 'Done:_FloodSchedule') {
    set.info.console = 'Done:_FloodSchedule'
  } */
}
// заполнение периодов с одинаковым времением начала
const runSameStartFlood = (schedule, set) => {
  const date = set.info.dateTrack
  let start = detail_estimate(schedule)
      .map(period => markStartFreeTime(schedule, period) )
      .map(time => new Object({time, dif: diffTime(set.info.tempNum, time)}))
      .sort( (difObjA, difObjB) => difObjA.dif - difObjB.dif)[0]
  set.info.tempNum = start
  set.calendar[date.year][months[date.month]][date.day] = [...schedule, buildTask(set.task, start, set.task.labour)]
  set.info.console = ''
 /* if(set.info.console !== 'Done:SameStartFlood') {
    set.info.console = 'Done:SameStartFlood'
  } */
}
// заполнение задачи в самый длинный свободный период дня
const runAccumFlood = (schedule, set) => {
  const date = set.info.dateTrack
  const maxFreePeriod = formTime(Math.max(...detail_estimate(schedule) ) )
  const start = markStartFreeTime(schedule, maxFreePeriod)
  set.info.tempNum = set.info.tempNum + maxFreePeriod
  set.calendar[date.year][months[date.month]][date.day] = set.task.labour - set.info.tempNum > 0 ? 
  [...schedule, buildTask(set.task, start, maxFreePeriod)] : schedule
  set.info.console = ''  
  /*if(set.info.console !== 'Done:_Done:_AccumFlood') {
    set.info.console = 'Done:_AccumFlood'
  } */
}

const runSplitFlood = (schedule, set) => {
  const date = set.info.dateTrack
  let periods = detail_estimate(schedule).sort( (a, b) => a - b) 
  periods.lenght = 2
  let startArr = periods.map(period => markStartFreeTime(schedule, period) )
  set.info.tempNum = set.info.tempNum + periods.reduce((acc, cur) => acc + cur)
  set.calendar[date.year][months[date.month]][date.day] = set.task.labour - set.info.tempNum > 0 ? 
  [...schedule, ...startArr.map( (start, i) => buildTask(set.task, start, periods[i] ) )] : schedule
  set.info.console = ''
  /*if(set.info.console !== 'Done:_Done:_SplitFlood') {
    set.info.console = 'Done:_SplitFlood'
  } */
}

export const dysplaySchedule = setting => universalCalendarMiddleWare(setting, runDysplaySchedule)
export const increaseFreeTime = setting => universalCalendarMiddleWare(setting, runIncreaseFreeTime)
export const decreaseTaskLabour = setting => universalCalendarMiddleWare(setting, runDecreaseTaskLabour)
export const floodSchedule = setting => universalCalendarMiddleWare(setting, runFloodSchedule)
export const sameStartFlood = setting => universalCalendarMiddleWare(setting, runSameStartFlood)
export const accumFlood = setting => universalCalendarMiddleWare(setting, runAccumFlood)
export const splitFlood = setting => universalCalendarMiddleWare(setting, runSplitFlood)