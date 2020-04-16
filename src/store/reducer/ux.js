import { C_UX } from '../constants/ux'

const initialState = {
  lang: 'Ru',
  completedFillPattern: false,
  aggressivenessExclude: 5,
  aggressivenessSqueezing: 5,
  aggressivenessPermutation: 5,
  minTaskTime: 30
}

export const ux = (state = initialState, action) => {
  switch(action.type) {
    case C_UX.CHANGE_LANG: return {
      ...state, lang: action.lang
    }
    case C_UX.COMPLETE_FILL_PATTERN: return {
      ...state, completedFillPattern: !state.completedFillPattern
    }
    case C_UX.SET_AGGRESSIVENESS_EXCLUDE: return {
      ...state, aggressivenessExclude: action.num
    }
    case C_UX.SET_AGGRESSIVENESS_SQUEEZING: return {
      ...state, aggressivenessSqueezing: action.num
    }
    case C_UX.SET_AGGRESSIVENESS_PERMUTATION: return {
      ...state, aggressivenessPermutation: action.num
    }
    case C_UX.SET_MIN_TASK_TIME: return {
      ...state, minTaskTime: action.num
    }
    default: return state
  }
}