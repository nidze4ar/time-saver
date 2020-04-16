import { connect } from 'react-redux'
import { A_CAL } from '../actions/calendar'
import PatternPreference from '../../components/Preference/PatternPreference'

const StoredPatternPref = connect(
  state => ({
    store: state
  }),  
  dispatch => ({
    _setCalendar(calendar) {
      dispatch(A_CAL.setCalendar(calendar) )
    }
  })
  )(PatternPreference)
  
export default StoredPatternPref