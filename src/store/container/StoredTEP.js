import { connect } from 'react-redux'
import { A_UX } from '../actions/ux'
import TimeEstimatePreference from '../../components/Preference/TimeEstimatePreference'

const StoredTEP = connect(
  state => ({
    store: state
  }),  
  dispatch => ({
    SAE(num) {
      dispatch(A_UX.setAggressivenessExclude(num) )
    },
    SAS(num) {
      dispatch(A_UX.setAggressivenessSqueezing(num) )
    },
    SAP(num) {
      dispatch(A_UX.setAggressivenessPermutation(num) )
    },
    setMinimumTaskTime(num) {
      dispatch(A_UX.setMinimumTaskTime(num) )
    }
  })
  )(TimeEstimatePreference)
  
export default StoredTEP