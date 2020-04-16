
export const rand = () => Math.random().toString().slice(2)
export const searchID = (arr, id) => arr.filter(v => v.id === id)[0]
export const searchIDObj = (arr, id) => Object.values(arr.filter(v => v.id === id)[0] )
export const sum = arr => arr.reduce( (acc, cur) => acc + cur, 0 ) 
export const sortByTime = arr => arr.sort( (itemA, itemB) => itemA.start - itemB.start )
export const changeID = arr => {
  for (let i = 0, len = arr.length; i < len; i++) {
    arr[i].id = i
  }
  return arr
}
export const clone = (cal, day) => {
  if(cal[day.year]) {
    return Object.assign({}, cal);
   } else {
     return cal                                                  // case wrong year?
   }
 }
export const delColon = str => `${str[0]}${str[1]}${str[3]}${str[4]}`
export const insertColon = str => {
  if(str.length === 4) return `${str[0]}${str[1]}:${str[2]}${str[3]}`
  return str
}
//------------------------------------------------------------//
// глубокое копирование обьектов
let isArray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
let isObject = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
export function cloneDeep(mas) {
  let masClone = isArray(mas) ? new Array(mas.length) : {};  
  Object.keys(mas).forEach(function (key) {
    if (isArray(mas[key]) || isObject(mas[key]))
      masClone[key] = cloneDeep(mas[key]);
    else
      masClone[key] = mas[key];
  })
  return masClone;
}
//------------------------------------------------------------//
// поиск нужного ид в массиве
export const findIdIndex = (arr, id) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    if(arr[i].id === id){
      return i
    }    
  }
  return false
}
// выбор задачи для записи в gap
export const chooseTask = (taskArr, gap, pastTaskId) => {
  return taskArr.filter(v => !~pastTaskId.indexOf(v.id) ).filter(v => v.dur < gap || v.dur === gap )[0]
}




