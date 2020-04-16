import {connect} from 'react-redux'
import { A_CAL } from './../actions/calendar'
import { A_UI } from './../actions/ui'
import Schedule from './../../components/Schedule/Schedule'

const StoredSchedule = connect(

  state => ({
    store: state
  }), 
  
  dispatch => ({
    taskManage(new_calend) {
      dispatch(A_CAL.manageSimpleTask(new_calend) )
    },
    _toggleModal() {     
      dispatch(A_UI.toggleModalAST() )
    },
    cancelModal() {     
      dispatch(A_UI.cancelModalAST() )
    },
    _toggleModeModal() {     
      dispatch(A_UI.toggleModeModalAST() )
    }
  })
  )(Schedule);

  
export default StoredSchedule