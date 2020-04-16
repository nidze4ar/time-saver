import {connect} from 'react-redux'
import { A_CAL } from './../actions/calendar'
import { A_UI } from './../actions/ui'
import QuickTask from './../../components/QuickTask/QuickTask'
import { prepareTaskSpread } from './../../lib/calendar_methods'

const StoredQuickTask = connect(
  state => ({
    store: state
  }),  
  dispatch => ({
    taskBegin(task, cal, ux) {
      dispatch(A_CAL.manageSimpleTask(prepareTaskSpread(task, cal, ux) ) )
      dispatch(A_CAL.removeQuickTask(task.id) )
    },
    _toggleModal() {     
      dispatch(A_UI.toggleModalAST() )
    },
    cancelModal() {     
      dispatch(A_UI.cancelModalAST() )
    },
    _toggleModeModal() {     
      dispatch(A_UI.toggleModeModalAST() )
    },
    _addQuickTask(task)  {     
      dispatch(A_CAL.addQuickTask(task) )
    },
    _removeQuickTask(id)  {     
      dispatch(A_CAL.removeQuickTask(id) )
    },
  })
  )(QuickTask)  
export default StoredQuickTask