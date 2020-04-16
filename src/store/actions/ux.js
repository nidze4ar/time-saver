import { C_UX } from '../constants/ux'

export const A_UX = {
  langChange: lang => ({
    type:  C_UX.CHANGE_LANG,
    lang
  }),
  complFillPattern: () => ({
    type:  C_UX.COMPLETE_FILL_PATTERN
  }),
  setAggressivenessExclude: num => ({
    type:  C_UX.SET_AGGRESSIVENESS_EXCLUDE,
    num
  }),
  setAggressivenessSqueezing: num => ({
    type:  C_UX.SET_AGGRESSIVENESS_SQUEEZING,
    num
  }),
  setAggressivenessPermutation: num => ({
    type:  C_UX.SET_AGGRESSIVENESS_PERMUTATION,
    num
  }),
  setMinimumTaskTime: num => ({
    type:  C_UX.SET_MIN_TASK_TIME,
    num
  })
}

