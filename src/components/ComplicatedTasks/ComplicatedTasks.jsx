import React, { useState } from "react";
import { Layout, Menu, Button, Modal, Input, Checkbox, Tooltip, DatePicker } from "antd"
import Informer from './../Informer/Informer'
import { date_validation, number_validation, string_validation } from './../../lib/validation'
import { compltask_field_fill } from './../../lib/task_methods'
import { searchID, searchIDObj } from './../../lib/tools'
import { prepareTaskSpread } from './../../lib/calendar_methods'
import { mainL }  from './../../lang'
import { infoL }  from './../../lang/infoL'
import './ComplicatedTasks.less'
const { RangePicker } = DatePicker;
const inputStyle = {
  marginTop: 5,
  marginBottom: 10,
  width: '90%',
  fontSize: '1.2rem'  
}
const ComplicatedTasks = ({ store, _add, _remove, _toggle, _toggleMode,  _cancel, taskManage, _toggleInfoModal }) => {
  const {core, ui, ux, info} = store
  const {tasks, calendar} = core  
  const [task_title, set_task_title] = useState('')
  const [task_id, set_task_id] = useState('')  
  const [task_dedline, set_task_dedline] = useState([{_d: 'day mount year'}, {_d: 'day mount year'}])
  const [task_exclusivity, set_task_exclusivity] = useState(false)
  const [task_compressibility, set_task_compressibility] = useState(false)
  const [task_urgent, set_task_urgent] = useState(false)
  const [task_importance, set_task_importance] = useState('')
  const [task_labour, set_task_labour] = useState('')
  const [editID, set_editID] = useState('0')
  const state = [task_title, task_id, task_dedline, task_exclusivity, task_compressibility, task_urgent, task_importance, task_labour]
  const set_state = [
    set_task_title, 
    set_task_id,
    set_task_dedline, 
    set_task_exclusivity, 
    set_task_compressibility, 
    set_task_urgent, 
    set_task_importance,
    set_task_labour
  ]
  const state_value = ['', '', [{}, {}], false, false, false, '', '']
  const finalize = (func, arg) => {
    func(arg)
    _toggle()
  }
  const autoToggleModal = booline => {    
    if(ui.modal_ACT_mode === booline) {
      _toggle()
    } else {
      _toggleMode(); 
      _toggle();
    }
  } 
  const add = () => finalize(_add, compltask_field_fill(state) )
  const toggleAddModal = () => autoToggleModal(true) 
  const remove = () => finalize( _remove, editID )
  const edit = id => {
    autoToggleModal(false) 
    //ID_validation(id, tasks) ? set_editID(rand() ) : set_editID(id)   меняет ID и не дает удалять
    set_editID(id)
    setTimeout( () => searchIDObj(tasks, id).map((value, index) => set_state[index](value) ), 1500)    
  }
  const finalEdit = () => {
    _remove(editID)
    _add(compltask_field_fill(state) )
    _toggle()
  }
  const runFloodTask = ({ field, value }) => {
    let res = { task: searchID(tasks, editID), calendar, ux, info }
    switch(field) {
      case 'decisionErrorId': res.info[field] = value
      break
      case 'throughPeriod': res.info[field] = value
      res.info.decisionErrorId = 3
      break
      case 'maxCountDiscretePeriods': res.info[field] = value
      res.info.decisionErrorId = 6
      break
      default: 
      break 
    }
    taskManage(prepareTaskSpread(res) )    
  }
  const estimate = () => {
    runFloodTask({field: null, value: null})
    _toggle()
  }
  const inputTask = e => {
    const { value, id } = e.target; 
    set_state[id](value)
  }
  const inputDate = date => set_state[2](date) 
  const checkTask = e => {
    const { checked, id } = e.target;
    set_state[id](checked)
  }
  const clearState = () => set_state.map( (v, i) => v(state_value[i]) )  
  const startAddСompl = () => {
    clearState()
    toggleAddModal()
  }
  // запускает отладку ошибки при разметке задачи  
  const getDesidionForErrorTaskSpread = desId => {
    runFloodTask({field: 'decisionErrorId', value: desId})
    _toggleInfoModal()
  }
  const setPeriod = period => {
    runFloodTask({field: 'throughPeriod', value: period})
    _toggleInfoModal()
  }
    return (
      <Layout>
      <Button onClick={startAddСompl}>{mainL[ux.lang].add_compl}</Button>
        <Modal
          title={ui.modal_ACT_mode ? mainL[ux.lang].modal_title : mainL[ux.lang].edit_task} 
          visible={ui.modal_ACT_visible}
          centered={true}
          onCancel={_cancel}
          footer={ui.modal_ACT_mode ?             
         <Layout className="footer">
                <Button onClick={add}>{mainL[ux.lang].add}</Button>
                <Button onClick={_cancel}>{mainL[ux.lang].return}</Button>
        </Layout> 
                 : 
        <Layout className="footer">
          <Button onClick={estimate}>{mainL[ux.lang].estimate}</Button>
          <Button onClick={_cancel}>{mainL[ux.lang].return}</Button>
          <Button onClick={finalEdit}>{mainL[ux.lang].edit}</Button>
          <Button onClick={remove}>{mainL[ux.lang].delete}</Button>
        </Layout>}
        >
        <Input.Group style={{marginTop: 5, marginBottom: 10,}}>        
        <Tooltip
          trigger={['focus']}
          title={string_validation(task_title) ? task_title:
             mainL[ux.lang].name + ' ' + mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="title-input"
        >
          <Input addonBefore={mainL[ux.lang].name}
           style={inputStyle} onChange={inputTask} id='0'
            placeholder={mainL[ux.lang].insert  + ' ' +   mainL[ux.lang].name} value={task_title} />
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
           placeholder={mainL[ux.lang].insert  + ' ' +   mainL[ux.lang].rand_num} value={task_id} />
        </Tooltip>
        <Tooltip
          trigger={['focus']}
          title={date_validation(task_dedline) ? task_dedline: 
            mainL[ux.lang].dedline  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="time-input"
        >
          <div>
            <DatePicker showTime id='2' placeholder={mainL[ux.lang].dedline} disabled={true} />
            <br />
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={[mainL[ux.lang].cal_start, mainL[ux.lang].cal_end]}
              onOk={inputDate}
            />
          </div>
        </Tooltip>
        <Tooltip
          trigger={['focus']}
          title={number_validation(task_importance) ? task_importance: 
            mainL[ux.lang].importance  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="importance-input"
        >
          <Input addonBefore={mainL[ux.lang].importance}
           style={inputStyle} onChange={inputTask} id='6'
            placeholder={mainL[ux.lang].insert  + ' ' +   mainL[ux.lang].spr_importance} value={task_importance} />
        </Tooltip>
        <Tooltip
          trigger={['focus']}
          title={number_validation(task_labour) ? task_labour: 
            mainL[ux.lang].labour  + ' ' +   mainL[ux.lang].wrong }
          placement="topLeft"
          overlayClassName="labour-input"
        >
          <Input addonBefore={mainL[ux.lang].labour}
           style={inputStyle} onChange={inputTask} id='7'
            placeholder={mainL[ux.lang].insert  + ' ' +   mainL[ux.lang].spr_labour} value={task_labour} />
        </Tooltip>
        </Input.Group>
          <div style={{marginBottom: 10, fontSise: 30}} >
            <Checkbox onChange={checkTask} id='3' checked={task_exclusivity} >{mainL[ux.lang].exclusivity}</Checkbox>
            <Checkbox onChange={checkTask} id='4' checked={task_compressibility} >{mainL[ux.lang].compressibility}</Checkbox>
            <Checkbox onChange={checkTask} id='5' checked={task_urgent} >{mainL[ux.lang].urgent}</Checkbox>
          </div>
        </Modal>

        <Modal
          title={infoL[ux.lang][info.console]} 
          visible={ui.info_modal_visible}
          centered={true}
          onCancel={_toggleInfoModal}
          footer={             
         <Layout className="footer">
                <Button onClick={_toggleInfoModal}>{mainL[ux.lang].add}</Button>
                <Button onClick={_toggleInfoModal}>{mainL[ux.lang].return}</Button>
        </Layout>}
        >
          <Informer error={info.console} getDesidion={getDesidionForErrorTaskSpread} 
                     tempArr={info.tempArr} setPeriod={setPeriod} lg={ux.lang}
                     dedPostpon={info.dedlinePostponement}
                     result={info.tempNum} 
          />
        </Modal>
              <Menu
                  theme='dark'
                  mode="inline"
                >                
                {tasks.length > 0 ? tasks.map(item=>
                  <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }}
                  onClick={() => edit(item.id)}
                  >        
                  <span>{item.title.toUpperCase()}</span>
                </Menu.Item>)
                  :
                <p>{mainL[ux.lang].no_entries}</p>}
            </Menu>
    </Layout>
    );
  }

export default ComplicatedTasks