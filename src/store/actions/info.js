import { C_INFO } from '../constants/info'

export const A_INFO = {             
  clear: () => ({
    type:  C_INFO.CLEAR,    
  }),
  set: ({ console, dedlinePostponement, decisionErrorId, throughPeriod, maxCountDiscretePeriods, tempNum }) => ({
    type:  C_INFO.SET,
    console, dedlinePostponement, decisionErrorId, throughPeriod, maxCountDiscretePeriods, tempNum   
  }),
  writeThroughPeriods: throughPeriods => ({
    type:  C_INFO.WRITE_THROUGH_PERIODS,
    throughPeriods    
  }),
  /*
  setDecisionErrorId: num => ({
    type:  C_INFO.SET_DECISION_ERROR_ID,
    num
  }),
  setThroughPeriod: str => ({
    type:  C_INFO.SET_THROUGH_PERIOD,
    str
  }),
  setMaxCountDiscretePeriods: num => ({
    type:  C_INFO.SET_MAX_COUNT_DISCRETE_PERIODS,
    num
  }),
  */
  setDedlinePostponemen: num => ({
    type:  C_INFO.SET_DEDLINE_POSTPONEMENT,
    num
  })
}
