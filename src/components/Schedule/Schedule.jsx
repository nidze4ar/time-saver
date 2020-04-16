import React, { useState } from 'react'
import { Layout, Menu, Button, Modal, Input, Checkbox, Tooltip } from "antd";
import Timeline from './../Timeline/Timeline'
import { schedule_render } from './../../lib/calendar_methods'
import { date_validation, number_validation, string_validation } from './../../lib/validation'
import { add_task, remove_task, edit_task, find_task, task_field_fill } from './../../lib/task_methods'
import { prep_data_timeline, formateDate, clock } from './../../lib/time_methods'
import { cloneDeep, insertColon } from './../../lib/tools'
import { mainL }  from './../../lang'
import  './Schedule.less'
const InputGroup = Input.Group;
const inputStyle = {
  marginTop: 5,
  marginBottom: 10,
  width: '90%',
  fontSize: '1.2rem'  
}
 
const Schedule = ({store, taskManage, _toggleModal, cancelModal, _toggleModeModal}) => {
  const {core, ui, ux} = store
  const {calendar, chosenDay, schedule} = core
  const [task_title, set_task_title] = useState('')
  const [task_id, set_task_id] = useState('')
  const [task_start, set_task_start] = useState('')
  const [task_end, set_task_end] = useState('')
  const [task_exclusivity, set_task_exclusivity] = useState(false)
  const [task_compressibility, set_task_compressibility] = useState(false)
  const [task_urgent, set_task_iurgent] = useState(false)
  const [task_importance, set_task_importance] = useState('')
  const [temp_cal, set_temp_cal] = useState({})
  const [editID, set_editID] = useState('0')
  const state = [task_title, task_id, task_start, task_end, task_exclusivity, task_compressibility, task_urgent, task_importance]
  const set_state = [set_task_title, set_task_id, set_task_start, set_task_end, set_task_exclusivity, set_task_compressibility, set_task_iurgent, set_task_importance]
  const state_value = ['', '', '', '', false, false, false, '']
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
        <Tooltip
          trigger={['focus']}
          title={number_validation(task_start) ? task_start:
            mainL[ux.lang].start  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="start_time"
        >
          <Input style={inputStyle}
           addonBefore={mainL[ux.lang].start} type='time'
            onChange={inputTask} id='2'
             placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].name} value={insertColon(task_start)} />
        </Tooltip>
        <Tooltip
          trigger={['focus']}
          title={date_validation(task_end) ? task_end: 
            mainL[ux.lang].end  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="time-input"
        >
          <Input style={inputStyle}
           addonBefore={mainL[ux.lang].end} type='time'
            onChange={inputTask} id='3'
             placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].name} value={insertColon(task_end)} />
        </Tooltip>
        <Tooltip
          trigger={['focus']}
          title={number_validation(task_importance) ? task_importance: 
            mainL[ux.lang].importance  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="importance-input"
        >
          <Input addonBefore={mainL[ux.lang].importance}
           style={inputStyle} onChange={inputTask} id='7'
            placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].spr_importance} value={task_importance} />
        </Tooltip>
        </InputGroup>
        <Checkbox onChange={checkTask} id='4' checked={task_exclusivity} >{mainL[ux.lang].exclusivity}</Checkbox>
        <Checkbox onChange={checkTask} id='5' checked={task_compressibility} >{mainL[ux.lang].compressibility}</Checkbox>
        <Checkbox onChange={checkTask} id='6' checked={task_urgent} >{mainL[ux.lang].urgent}</Checkbox>
        </Modal>
              <Menu
                  theme='dark'
                  mode="inline"                  
                >                
                {
                  schedule.length ? schedule_render(chosenDay, store).map(item=>
                  <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }}
                  onClick={() => edit(item.id)}
                  >        
                  <span>{item.title.toUpperCase() + 
                  new Array(20).fill(String.fromCharCode('0160')).join('') +
                   ' Start: '+ insertColon(item.start) + ' End: '+ insertColon(item.end)}</span>
                  </Menu.Item>) :
                  <Menu.Item>{mainL[ux.lang].no_entries}</Menu.Item>
                  }
                {                  
                    schedule.length ? <Timeline 
                    name={formateDate(ux.lang) + '  ' + clock()}
                    data={schedule_render(chosenDay, store) ? 
                    prep_data_timeline(cloneDeep(schedule_render(chosenDay, store)) ) : []}
                    /> : <p>NO data</p>                   
                  }
            </Menu>
    </Layout>
  )
}

export default Schedule