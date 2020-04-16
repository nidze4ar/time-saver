import { rand, sortByTime, changeID, delColon, clone, findIdIndex, chooseTask } from './tools'
import { diffTime, demountTime, detail_estimate, addTime, formLabourTime, formTime, divTime } from './time_methods' 
import { getDate } from './date_methods'

export const add_task = (cal, day, task) => {
  const newCal = clone(cal, day);
    newCal[day.year][day.month][day.day - 1] = changeID(sortByTime([...getDate(newCal, day), task]) );
      return newCal
 }  
export const remove_task = (cal, day, id) => {     // зависимость от поля id, удаление последнего может вызвать ошпбку
    const newCal = clone(cal, day);
      newCal[day.year][day.month][day.day - 1] = getDate(newCal, day).filter(task => task.id !== id);  
        return newCal
  }
export const find_task = (cal, day, id) => {
  const newCal = clone(cal, day); 
    return getDate(newCal, day).filter(task => task.id === id)[0];
 }
export const edit_task = (cal, day, id, task) => {
  const newCal = clone(cal, day);
    newCal[day.year][day.month][day.day - 1] = [...getDate(newCal, day).filter(task => task.id !== id), task];
      return newCal;
 }

// заполнение простой задачи в распорядок
export const task_field_fill = arr => {
    return {
      title: arr[0] ? arr[0] : 'something-name',
      id: arr[1] ? arr[1] : rand(),
      start: arr[2] ? delColon(arr[2]) : `1${rand()[1]}00`,
      end: arr[3] ? delColon(arr[3]) : `1${rand()[1]}00`,
      exclusivity: arr[4] ? arr[4] : false,
      compressibility: arr[5] ? arr[5] : false,
      urgent: arr[6] ? arr[6] : false,
      importance: arr[7] ? arr[7] : rand()[0]
    }
}
// заполнение сложной задачи в распорядок
export const compltask_field_fill = arr => { 
  /* 
  const moment = !arr[2] ? [
    {_d: new Date()},
    {_d: new Date(new Date().setDate(new Date().getDate() + 7) )}
  ] : arr[2]
  */
    return {
      title: arr[0] ? arr[0] : '???',
      id: arr[1] ? arr[1] : rand(),
      dedline: arr[2],
      exclusivity: arr[3] ? arr[3] : false,
      compressibility: arr[4] ? arr[4] : false,
      urgent: arr[5] ? arr[5] : false,
      importance: arr[6] ? arr[6] : rand()[0],
      labour: arr[7] ? arr[7] : `${rand()[0]}0`
  }
}
// заполнение задачи в распорядок
export const buildTask = (complTask, start, duration) => {
  let dur = duration.toString().length > 3 ? duration : formLabourTime(duration)
  return {
    title: complTask.title ? complTask.title : 'complTask name',
    id: complTask.id ? complTask.id : rand(),
    start: start ? start : `1${rand()[1]}00`,
    end: start ? addTime(start, dur) : '2400',
    exclusivity: complTask.exclusivity ? complTask.exclusivity : false,
    compressibility: complTask.compressibility ? complTask.compressibility : false,
    urgent: complTask.urgent ? complTask.urgent : false,
    importance: complTask.importance ? complTask.importance : rand()[0]
  }
 }

// поиск момента начала нужного периода
export const markStartFreeTime = (schedule, duration) => {      // переписать с выбором периодов? 
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end &&
      diffTime(schedule[i-1].end, schedule[i].start) === duration) {
      return schedule[i-1].end
    }
  }
  if(duration === diffTime(schedule[schedule.length - 1].end, '2400') ) {
    return schedule[schedule.length - 1].end
  }  
  return '2359'
}

 // инициализация заполнения задачи
 export const flood = (schedule, task, labour) => {
  if(demountTime(Math.max(...detail_estimate(schedule) ) ) > labour) {
    // заполнения задачи при достаточном времени дня
    let amount = formTime(Math.max(...detail_estimate(schedule) ) )  
    let start = markStartFreeTime(schedule, amount)
    //console.log(start, labour)
    return [...schedule, buildTask(task, start, labour)]
  } else {
    // заполнения задачи по частям при недостаточном времени дня
    let taskDur = schedule.map( (v, index) => index > 0 ? diffTime(schedule[index > 0 ? index - 1 : index].end, v.start) : '0000' )
    let lastDur = diffTime(schedule[schedule.length - 1].end, '2400') === 0 ? '0000' : diffTime(schedule[schedule.length - 1].end, '2400')
    let dur = [...taskDur, lastDur].filter(v => v !== '0000') 
    let arrSum = 0
    let term = []
    // поиск свободных периодов
    while(arrSum < labour) {
      let temp = formTime(Math.max(...dur) )
      arrSum += demountTime(temp)
      term.push(temp)
      dur[dur.indexOf(temp)] = '0000'
    }
    let time = []                                                   // сохранение начала периодов чтобы не повторялись
    let periods = []                                                // длительность периодов
    let tasks = schedule.slice()
    for (var i = 0, len = term.length; i < len; i++) {              // var чтобы удалять найденные периоды
      let start = markStartFreeTime(tasks, term[i])
      time.push(start)
      periods.push(term[i])
      tasks.filter(v => v.start !== start)
    }
    let result = schedule.slice()
    for (let i = 0, len = time.length; i < len; i++) {
      result = [...result, buildTask(task, time[i], periods[i])]
    }
    return result
  }
 }
 /*
export const squeezFlood = (schedule, savedTask, compressionRatio, ux, labour) => {
 // for increase free time:
 const runExcludeTask = arr => {                                                      
   if(ux.aggressivenessExclude){
     return arr.filter(task => task.exclusivity === false)
   } else {
     return arr
   }
 }
 const runCompressTask = arr => ux.aggressivenessSqueezing ? compressTask(arr, compressionRatio) : arr
 const runCompressGap = arr => ux.aggressivenessSqueezing ? compressGap(arr) : arr
 const runPermutationTask = arr => ux.aggressivenessPermutation ? permutationTask(arr) : arr
 const permutationTask = arr => {
  let temp = []
  let result = []
  // разделяем перемещаемые и неперемещаемые задачи
    for (let i = 0, len = arr.length; i < len; i++) {
      if(arr[i].movable){
        temp.push(arr[i])
      } else {
        result.push(arr[i])
      }
    }
    // заполняем перемещаемые задачи в неперемещаемые
    for (let i = 0, len = temp.length; i < len; i++) {
      let dur = demountTime(diffTime(temp[i].start, temp[i].end) )
      let start = !result.length ? '0000' : result[result.length - 1].end  // добовать markStartFreeTime 
      result = sortByTime([...schedule, buildTask(temp[i], start, dur)])
    }
  return result  
 } 
     // initiate
  let newSchedule = sortByTime(runPermutationTask(runCompressGap(runCompressTask(runExcludeTask(schedule) ) ) ) )    // clear and compress schedule
  return flood(newSchedule, savedTask, labour)                                          
}
*/
// сдвиг задач в распорядке
export const compressGap = arr => {                                                            
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i])
    if(i > 0 && arr[i].start !== arr[i - 1].end && arr[i].movable){
      let durationTask = diffTime(arr[i].start, arr[i].end)
      newArr[i].start = newArr[i - 1].end
      newArr[i].end = addTime(arr[i - 1].end, durationTask)
    } 
  }
 return newArr
}
// сдвиг задач в распорядке
export const compressTask = (arr, compressionRatio = 1) => {                                       
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i++) {
    newArr.push(arr[i])
    let durationTask = diffTime(arr[i].start, arr[i].end)
    if(i > 0 && arr[i].compressibility && durationTask > 10){
      newArr[i].start = arr[i].start
      newArr[i].end = addTime(arr[i].start, Math.round(divTime(durationTask, compressionRatio, arr[i].importance) ) ) 
    } 
  }
 return newArr
}
// перемешивание задач в распорядке
export const permutationTask = arr => {
  let temp = [], result = [], gapDurArr = [], pastTaskId = [], tgtTask  
    for (let i = 0, len = arr.length; i < len; i++) {
      if(arr[i].movable){
        temp.push(arr[i])
      } else {
        result.push(arr[i])
      }
    }
    let taskArr = temp.map(v =>
      new Object({                                   
        id: v.id,                                      
        dur: demountTime(diffTime(v.start, v.end) )   
      }) 
    )
    for (let i = 1, len = arr.length; i < len; i++) {
      gapDurArr.push(demountTime(diffTime(arr[i - 1].end, arr[i].start) ) ) 
    }
      for (let i = 0, len = gapDurArr.length; i < len; i++) {
        if(gapDurArr[i] && chooseTask(taskArr, gapDurArr[i], pastTaskId) ) {
          tgtTask = chooseTask(taskArr, gapDurArr[i], pastTaskId)          
            let task = temp[findIdIndex(temp, tgtTask.id)] 
            task.start = arr[i - 1].end 
            task.end = addTime(arr[i - 1].end, formLabourTime(tgtTask.dur) )
            result.push(task)
            pastTaskId.push(tgtTask.id)
          }
        }
    return result
  }
// инициализация заполнения задачи
export const simpleFlood = (schedule, task, labour) => {
  let freePeriods = detail_estimate(schedule)
  if(demountTime(Math.max(...detail_estimate(schedule) ) ) > labour) {
    // заполнения задачи при достаточном времени дня
    let amount = formTime(Math.max(...detail_estimate(schedule) ) )  
    let start = markStartFreeTime(schedule, amount)
    return [...schedule, buildTask(task, start, labour)]
  } else {
    // заполнения задачи по частям при недостаточном времени дня
    let taskDur = schedule.map( (v, index) => index > 0 ? diffTime(schedule[index > 0 ? index - 1 : index].end, v.start) : '0000' )
    let lastDur = diffTime(schedule[schedule.length - 1].end, '2400') === 0 ? '0000' : diffTime(schedule[schedule.length - 1].end, '2400')
    let dur = [...taskDur, lastDur].filter(v => v !== '0000') 
    let arrSum = 0
    let term = []
    // поиск свободных периодов
    while(arrSum < labour) {
      let temp = formTime(Math.max(...dur) )
      arrSum += demountTime(temp)
      term.push(temp)
      dur[dur.indexOf(temp)] = '0000'
    }
    let time = []                                                   // сохранение начала периодов чтобы не повторялись
    let periods = []                                                // длительность периодов
    let tasks = schedule.slice()
    for (var i = 0, len = term.length; i < len; i++) {              // var чтобы удалять найденные периоды
      let start = markStartFreeTime(tasks, term[i])
      time.push(start)
      periods.push(term[i])
      tasks.filter(v => v.start !== start)
    }
    let result = schedule.slice()
    for (let i = 0, len = time.length; i < len; i++) {
      result = [...result, buildTask(task, time[i], periods[i])]
    }
    return result
  }
 }

 






  
