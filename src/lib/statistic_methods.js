import { rand, sortByTime } from './tools'
//-----------------------------------------------------------------------//
// ччмм
const mountTime = moment => {
  if(typeof moment !== 'string'){
    moment = moment.toString()
    return +moment.slice(0, -2) * 60 + +moment.slice(-2)
  } else {
    return +moment.slice(0, -2) * 60 + +moment.slice(-2)
  }
}
// чч
export const demountTime = moment => {
  if(typeof moment !== 'string'){
    moment = moment.toString()
    return +moment.slice(0, -2) + moment.slice(-2) / 60
  } else {
    return +moment.slice(0, -2) + moment.slice(-2) / 60
  }
}
const formTime = moment => {
  if(typeof moment !== 'string'){
    moment = moment.toString()
    return moment.length < 4 ? '0' + moment : moment
  } else {
    return moment.length < 4 ? '0' + moment : moment
  }
}
const formMin = min => min < 10 ? '0' + min : min.toString()
const formLabourTime = labour => {
  let integerPart = Math.floor(labour).toString()
  let floatPart = Math.floor( (labour - Math.floor(labour) ) * 100)  
  return formTime(integerPart + formMin(Math.floor(floatPart * 0.6) ) )
}
export const diffTime = (a, b) => formTime( ( (mountTime(b) - mountTime(a)) - (mountTime(b) - mountTime(a)) % 60) / 60 + formMin( (mountTime(b) - mountTime(a)) % 60) )
const addTime = (a, b) => formTime( ( (mountTime(b) + mountTime(a)) - (mountTime(b) + mountTime(a)) % 60) / 60 + formMin( (mountTime(b) + mountTime(a)) % 60) )
// сжатие маловажных задач
const divTime = (moment, perc, importance) => moment * ( (perc + importance) * 5 ) / 100       
//------------------------------------------------------------------------------//
// сдвиг задач в распорядке
const compressGap = arr => {                                                            
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
const compressTask = (arr, compressionRatio) => {                                       
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
// заполнение задачи в распорядок
const buildTask = (complTask, start, duration) => {
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
const markStartFreeTime = (schedule, duration) => {      // переписать с выбором периодов? 
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

////////////////////////////////////////////////////////////////////////////////////////////////
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
export const squeezFlood = (schedule, savedTask, compressionRatio, ux, labour) => {
  let newSchedule = sortByTime(runPermutationTask(runCompressGap(runCompressTask(runExcludeTask(schedule) ) ) ) )    // clear and compress schedule
  return flood(newSchedule, savedTask, labour)                                          
}