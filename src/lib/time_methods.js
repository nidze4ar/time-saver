export function formateDate(lang){
  return new Date().toLocaleString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
// фильтрация полей
const filterKeys = obj => {
  const validKeys = ['title', 'start']
  Object.keys(obj).forEach((key) => validKeys.includes(key) || delete obj[key])
  return obj
}
export const prep_data_timeline = schedule => schedule.map(v => filterKeys(v) )
export const clock = () => `${new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes(): '0' + new Date().getMinutes()}`

//___________________________________________________________________________________________________________________//
export const time_estimate = schedule => {                                   // все свободное время дня
  let acc = 0;
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end) {
      acc += (schedule[i].start - schedule[i-1].end)
    }
  }
  return acc / 100
}
// массив количества свободного времени
export const detail_estimate = schedule => {                
  let acc = []  
  for (let i = 1, len = schedule.length; i < len; i++) {
    if(schedule[i].start !== schedule[i-1].end) {
      acc.push(diffTime(schedule[i-1].end, schedule[i].start) )
    }
  }
  return acc.length ? acc : [diffTime(schedule[schedule.length - 1].end, '2400')]
}
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
export const formTime = moment => {
  if(typeof moment !== 'string'){
    moment = moment.toString()
    return moment.length < 4 ? '0' + moment : moment
  } else {
    return moment.length < 4 ? '0' + moment : moment
  }
}
const formMin = min => min < 10 ? '0' + min : min.toString()
export const formLabourTime = labour => {
  let integerPart = Math.floor(labour).toString()
  let floatPart = Math.floor( (labour - Math.floor(labour) ) * 100)  
  return formTime(integerPart + formMin(Math.floor(floatPart * 0.6) ) )
}
export const diffTime = (a, b) => formTime( ( (mountTime(b) - mountTime(a)) - (mountTime(b) - mountTime(a)) % 60) / 60 + formMin( (mountTime(b) - mountTime(a)) % 60) )
export const addTime = (a, b) => formTime( ( (mountTime(b) + mountTime(a)) - (mountTime(b) + mountTime(a)) % 60) / 60 + formMin( (mountTime(b) + mountTime(a)) % 60) )
// сжатие маловажных задач
export const divTime = (moment, perc, importance) => moment * ( (perc + importance) * 5 ) / 100       
//------------------------------------------------------------------------------//
 
