import { C_UI } from '../constants/ui'

export const A_UI = {
  toggleModalAST: () => ({
    type:  C_UI.TOGGLE_MODAL_ADD_SIMPLE_TASK,
  }),
  okModalAST: task => ({
    type:  C_UI.OK_MODAL_ADD_SIMPLE_TASK,
    task
  }),
  cancelModalAST: () => ({
    type:  C_UI.CANCEL_MODAL_ADD_SIMPLE_TASK,
  }),
  toggleModalACT: () => ({
    type:  C_UI.TOGGLE_MODAL_ADD_COMPLICATED_TASK,
  }),
  okModalACT: task => ({
    type:  C_UI.OK_MODAL_ADD_COMPLICATED_TASK,
    task
  }),
  cancelModalACT: () => ({
    type:  C_UI.CANCEL_MODAL_ADD_COMPLICATED_TASK,
  }),
  toggleModeModalAST: () => ({
    type:  C_UI.TOGGLE_MODE_MODAL_ADD_SIMPLE_TASK
  }),
  toggleModeModalACT: () => ({
    type:  C_UI.TOGGLE_MODE_MODAL_ADD_COMPLICATED_TASK
  }),
  togglePatternModal: () => ({
    type:  C_UI.TOGGLE_PATTERN_MODAL
  }),
  toggleModePatternModal: () => ({
    type:  C_UI.TOGGLE_MODE_PATTERN_MODAL
  }),
  toggleInfoModal: () => ({
    type:  C_UI.TOGGLE_INFO_MODAL
  }),
}

