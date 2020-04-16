import {connect} from 'react-redux'
import { A_STAT } from './../actions/calendar'
import { A_UI } from './../actions/ui'
import Statistic from './../../components/Statistic/Statistic'

const StoreStat = connect(

  state => ({
    store: state
  }), 
  
  dispatch => ({
    toggleModal() {     
      dispatch(A_UI.toggleModalAST() )
    },
    cancelModal() {     
      dispatch(A_UI.cancelModalAST() )
    },
    _toggleModeModal() {     
      dispatch(A_UI.toggleModeModalAST() )
    },
  })
  )(Statistic);

  
export default StoreStat