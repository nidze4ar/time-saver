import { C_STAT } from '../constants/stat'
import { searchIDObj } from './../../lib/tools'

const initialState = {
  tasks: [],
}

export const stat = (state = initialState, action) => {
  switch(action.type) {
    case C_STAT.DEFINE_REMINDER: 
    let task = searchIDObj(state.tasks, action.id)
    task.remainder = action.remainder
    return {
      ...state, tasks: [...state.tasks, task]
    }
    default: return state
  }
}