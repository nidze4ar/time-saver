import { C_INFO } from '../constants/info'

const initialState = {
  console: 'CE',
  dedlinePostponement: 0,
  decisionErrorId: 0,
  throughPeriod: '',
  maxCountDiscretePeriods: 0,
  tempArr: [], // он же для расчета IncreaseFreeTime
  tempNum: 0,
  dateTrack: {   // записывается день при автопроходе universalCalendarMeddleWare
    year: 0,
    month: '',
    day: 0
  }
}

export const info = (state = initialState, action) => {
  switch(action.type) {
    case C_INFO.CLEAR: return {
      ...state,
      console: 'CE',
    }
    case C_INFO.SET: return {
      ...state,
      console: action.console,
      dedlinePostponement: action.dedlinePostponement,
      decisionErrorId: action.decisionErrorId,
      throughPeriod: action.throughPeriod,
      maxCountDiscretePeriods: action.maxCountDiscretePeriods,
      tempNum: action.tempNum
    }
    case C_INFO.WRITE_THROUGH_PERIODS: return {
      ...state,
      tempArr: action.tempArr,
    }
    case C_INFO.SET_DEDLINE_POSTPONEMENT: return {
      ...state, dedlinePostponement: action.num
    }
    default: return state
  } 
}