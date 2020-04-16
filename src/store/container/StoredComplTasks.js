import { connect } from 'react-redux'
import { A_CAL } from '../actions/calendar'
import { A_UI } from '../actions/ui'
import { A_INFO } from '../actions/info'
import ComplicatedTasks from '../../components/ComplicatedTasks/ComplicatedTasks'

const StoredComplTasks = connect(
  state => ({
    store: state
  }),  
  dispatch => ({
    _add(task) {
      dispatch(A_CAL.addComplicatedTask(task) )
    },
    taskManage(obj) {
      if(!obj.info.console){
        dispatch(A_CAL.manageSimpleTask(obj.calendar) )
      } else {
        dispatch(A_CAL.manageSimpleTask(obj.calendar) )
        dispatch(A_UI.toggleInfoModal() )
        dispatch(A_INFO.set(obj.info) )
      }      
    },
    _remove(id) {
      dispatch(A_CAL.removeComplicatedTask(id) )
    },
    _toggle() {
      dispatch(A_UI.toggleModalACT() )
    },
    _toggleMode() {
      dispatch(A_UI.toggleModeModalACT() )
    },
    _cancel() {
      dispatch(A_UI.cancelModalACT() )
    },
    _toggleInfoModal() {
      dispatch(A_UI.toggleInfoModal() )
    }
  })
  )(ComplicatedTasks)
  
export default StoredComplTasks