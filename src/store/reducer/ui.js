import { C_UI } from '../constants/ui'

const initialState = {
  start_modal_visible: false,
  start_modal_mode: false,
  modal_AS_visible: false,
  modal_AS_mode: false,
  modal_ACT_visible: false,
  modal_ACT_mode: false,
  pattern_modal_visible: true,
  pattern_modal_mode: false,
  info_modal_visible: false,
}

export const ui = (state = initialState, action) => {
  switch(action.type) {
    
    case C_UI.TOGGLE_MODAL_ADD_SIMPLE_TASK: return {
      ...state,
      modal_AS_visible: !state.modal_AS_visible,
    }
    case C_UI.OK_MODAL_ADD_SIMPLE_TASK: return {
      ...state,
      modal_AS_task: action.modal_AS_task
    }
    case C_UI.CANCEL_MODAL_ADD_SIMPLE_TASK: return {
      ...state,
      modal_AS_visible: false,
    }
    
    case C_UI.TOGGLE_MODAL_ADD_COMPLICATED_TASK: return {
      ...state,
      modal_ACT_visible: !state.modal_ACT_visible,
    }
    case C_UI.OK_MODAL_ADD_COMPLICATED_TASK: return {
      ...state,
      modal_ACT_task: action.modal_ACT_task
    }
    case C_UI.CANCEL_MODAL_ADD_COMPLICATED_TASK: return {
      ...state,
      modal_ACT_visible: false,
    }
    case C_UI.TOGGLE_MODE_MODAL_ADD_SIMPLE_TASK: return {
      ...state,
      modal_AS_mode: !state.modal_AS_mode,
    }
    case C_UI.TOGGLE_MODE_MODAL_ADD_COMPLICATED_TASK: return {
      ...state,
      modal_ACT_mode: !state.modal_ACT_mode,
    }
    case C_UI.TOGGLE_PATTERN_MODAL: return {
      ...state,
      pattern_modal_visible: !state.pattern_modal_visible,
    }
    case C_UI.TOGGLE_MODE_PATTERN_MODAL: return {
      ...state,
      pattern_modal_mode: !state.pattern_modal_mode,
    }
    case C_UI.TOGGLE_INFO_MODAL: return {
      ...state,
      info_modal_visible: !state.info_modal_visible,
    }
    default: return state
  } 
}