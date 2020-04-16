import React, { useState } from 'react'
import { Layout, Menu, Button, Modal, Input, Tooltip } from "antd";
import { number_validation, string_validation } from './../../lib/validation'
import { add_task, remove_task, edit_task, find_task, task_field_fill } from './../../lib/task_methods'
import { cloneDeep } from './../../lib/tools'
import { mainL }  from './../../lang'
import  './QuickTask.less'
const InputGroup = Input.Group;
const inputStyle = {
  marginTop: 5,
  marginBottom: 10,
  width: '90%',
  fontSize: '1.2rem'  
}
 
const QuickTask = ({store, taskBegin, _toggleModal, cancelModal, _toggleModeModal, _addQuickTask, _removeQuickTask}) => {
  const {core, ui, ux} = store
  const {calendar, chosenDay, schedule, queekTask} = core
  const [task_title, set_task_title] = useState('')
  const [task_id, set_task_id] = useState('')
  const [temp_cal, set_temp_cal] = useState({})
  const [editID, set_editID] = useState('0')
  const state = [task_title, task_id]
  const set_state = [set_task_title, set_task_id]
  const state_value = ['', '']
  const autoToggleModal = (booline) => {    
    if(ui.modal_AS_mode === booline){
      _toggleModal()
    } else {
      _toggleModeModal() 
      _toggleModal();
    }
  }
  const closeModalWith = calendar => {    
    taskManage(calendar)
    _toggleModal() 
  } 
  const remove = () => closeModalWith(temp_cal)
  const add = () => closeModalWith(add_task( calendar, chosenDay, task_field_fill(state) ) )
  const edit = id => {
    autoToggleModal(false) 
    set_editID(id)
    set_temp_cal(remove_task(cloneDeep(calendar), chosenDay, id) ) 
    setTimeout(() => Object.values( find_task(calendar, chosenDay, id) )
      .map((value, index) => set_state[index](value)), 1500)
  }
  const finalEdit = () => closeModalWith(edit_task(calendar, chosenDay, editID, task_field_fill(state)) )  
  const inputTask = e => {
      const { value, id } = e.target;
      set_state[id](value)
  }
  const checkTask = e => {
    const { checked, id } = e.target;
    set_state[id](checked)
  }
  const clearState = () => set_state.map( (v, i) => v(state_value[i])) 
  const startAdd = () => {
    clearState()
    autoToggleModal(true)
  }
  return(
    <Layout >
      <Button onClick={startAdd}>{mainL[ux.lang].add_task}</Button>
        <Modal
          title={ui.modal_AS_mode ? mainL[ux.lang].modal_title : mainL[ux.lang].edit_task} 
          visible={ui.modal_AS_visible}
          cancelText={mainL[ux.lang].return}
          okText={mainL[ux.lang].add}
          className='add_simple_task'
          centered={true}
          onCancel={cancelModal}
          footer={ui.modal_AS_mode ?             
         <Layout className="footer">
                <Button onClick={add}>{mainL[ux.lang].add_task}</Button>
                <Button onClick={cancelModal}>{mainL[ux.lang].return}</Button>
        </Layout> 
                 : 
        <Layout className="footer">
          <Button onClick={cancelModal}>{mainL[ux.lang].return}</Button>
          <Button onClick={finalEdit}>{mainL[ux.lang].edit}</Button>
          <Button onClick={remove}>{mainL[ux.lang].delete}</Button>
        </Layout>}
        > 
        <InputGroup size='large' compact={true}>
        <Tooltip
          trigger={['focus']}
          title={string_validation(task_title) ? task_title:
             mainL[ux.lang].name + ' ' +  mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="title-input"
        >
          <Input addonBefore={mainL[ux.lang].name}
           style={inputStyle} onChange={inputTask} id='0'
            placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].name} value={task_title} />
        </Tooltip>        
        <Tooltip
          trigger={['focus']}
          title={number_validation(task_id) ? task_id: 
            mainL[ux.lang].id  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="numeric-input"
        >
          <Input addonBefore={mainL[ux.lang].id} 
          style={inputStyle} onChange={inputTask} id='1'
           placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].rand_num} value={task_id} />
        </Tooltip>
        </InputGroup>
        </Modal>
              <Menu theme='dark' mode="inline" >                
                  {queekTask.length ? queekTask.map(item=>
                  <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }}
                  onClick={() => edit(item.id)} >        
                  <span>{item.title.toUpperCase()}</span>
                  </Menu.Item>) :
                  <Menu.Item>{mainL[ux.lang].no_entries}</Menu.Item>}                
            </Menu>
    </Layout>
  )
}

export default QuickTask