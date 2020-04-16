import { C_TASK } from '../constants/day'

export const A_DAY = {             
choseDay: day => ({
    type:  C_TASK.CHOSE_DAY,
    day
  })
}