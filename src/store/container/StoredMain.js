import { connect } from 'react-redux'
import { A_CAL } from './../actions/calendar'
import { A_UX } from './../actions/ux'
import { A_UI } from './../actions/ui'
import Main from './../../components/Main/Main'
import { default_weekdays, default_weekends } from './../../lib/patterns'

const StoredMain = connect(
  state => ({
    store: state
  }),  
  dispatch => ({
    _setCalendar(calendar) {     
      dispatch(A_CAL.setCalendar(calendar) )
    },
    _choseDay(day) {
     dispatch(A_CAL.choseDay(day) )
    },
    _langChange(lang) {
     dispatch(A_UX.langChange(lang) )
    },
    _setSchedule(schedule) {     
      dispatch(A_CAL.setSchedule(schedule) )
    },
    _setTimeline(timeline) {     
      dispatch(A_CAL.setTimeline(timeline) )
    },
    _togglePatternModal(weekdays, weekends){
      weekdays.length ? dispatch(A_CAL.setWeekdaysPattern(weekdays) ) :  
      dispatch(A_CAL.setWeekdaysPattern(default_weekdays) )                 // режим дня по умолчанию
      weekends.length ? dispatch(A_CAL.setWeekendsPattern(weekends) ) :
      dispatch(A_CAL.setWeekendsPattern(default_weekends) )                 // режим дня по умолчанию
      dispatch(A_UI.togglePatternModal() )      
      dispatch(A_UX.complFillPattern() )
    },
    _toggleModePatternModal() {
      dispatch(A_UI.toggleModePatternModal() )
    },
    _setWeekdaysPattern(weekdays) {
      dispatch(A_CAL.setWeekdaysPattern(weekdays) )
    },
    _setWeekendsPattern(weekends) {
      dispatch(A_CAL.setWeekendsPattern(weekends) )
    },
  })
  )(Main)
  
export default StoredMain
  
  

  