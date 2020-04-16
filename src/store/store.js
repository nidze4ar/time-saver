import {createStore, combineReducers} from 'redux'
import {ui} from './reducer/ui'
import {ux} from './reducer/ux'
import {stat} from './reducer/stat'
import {core} from './reducer/calendar'
import {info} from './reducer/info'

export const store = createStore(combineReducers({
  core,
  ui,
  ux,
  stat,
  info
  })/*,
  (localStorage['redux-store']) ?
  JSON.parse(localStorage['redux-store']) : {}
)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})
*/
)
