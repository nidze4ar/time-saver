import { C_STAT } from '../constants/stat'

export const A_STAT = {
    defRemainder: (remainder, id) => ({
    type:  C_STAT.DEFINE_REMINDER,
    remainder,
    id
  })
}