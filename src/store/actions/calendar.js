import { C_CAL } from '../constants/calendar'

export const A_CAL = {             
  setCalendar: calendar => ({
    type:  C_CAL.SET_CAL,
    calendar
  }),
  manageSimpleTask: cal => ({
    type:  C_CAL.MANAGE_SIMPLE_TASK,
    cal
  }),
  manageComplicatedTasks: tasks => ({
    type:  C_CAL.MANAGE_SIMPLE_TASK,
    tasks
  }),
  choseDay: day => ({
    type:  C_CAL.CHOSE_DAY,
    day
  }),
  addComplicatedTask: task => ({
    type:  C_CAL.ADD_COMPLICATED_TASK,
    task
  }),
  removeComplicatedTask: id => ({
    type:  C_CAL.REMOVE_COMPLICATED_TASK,
    id
  }),
  setSchedule: schedule => ({
    type:  C_CAL.SET_SCHEDULE,
    schedule
  }),
  setWeekdaysPattern: weekdays => ({
    type:  C_CAL.SET_WEEKDAY_PATTERN,
    weekdays
  }),
  setWeekendsPattern: weekends => ({
    type:  C_CAL.SET_WEEKEND_PATTERN,
    weekends
  }),
  addQuickTask: task => ({
    type:  C_CAL.ADD_QUICK_TASK,
    task
  }),
  removeQuickTask: id => ({
    type:  C_CAL.REMOVE_QUICK_TASK,
    id
  }),
}

