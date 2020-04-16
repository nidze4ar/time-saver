import { C_CAL } from '../constants/calendar'

const initialState = {
  calendar: {},
  chosenDay: {},
  schedule: [],
  tasks: [],
  weekdays: [],
  weekends: [],
  quickTask: []
}

export const core = (state = initialState, action) => {
  switch(action.type) {
    case C_CAL.SET_CAL: return {
      ...state,
      calendar: action.calendar
    }
    case C_CAL.CHOSE_DAY: 
    return {
      ...state,
      chosenDay: action.day
    }
    case C_CAL.MANAGE_SIMPLE_TASK: {
      return {
      ...state, calendar: action.cal
    }} 
    case C_CAL.ADD_COMPLICATED_TASK: return {
      ...state, tasks: [...state.tasks, action.task]
    }
    case C_CAL.REMOVE_COMPLICATED_TASK: return {
      ...state, tasks: state.tasks.filter(item => item.id !== action.id)
    }    
    case C_CAL.SET_SCHEDULE: return {
      ...state, schedule: action.schedule
    }
    case C_CAL.SET_WEEKDAY_PATTERN: return {
      ...state, weekdays: action.weekdays
    }
    case C_CAL.SET_WEEKEND_PATTERN: return {
      ...state, weekends: action.weekends
    }

    case C_CAL.ADD_QUICK_TASK: return {
      ...state, quickTask: [...state.quickTask, action.task]
    }
    case C_CAL.REMOVE_QUICK_TASK: return {
      ...state, quickTask: state.quickTask.filter(item => item.id !== action.id)
    }
    default: return state
  }
}

