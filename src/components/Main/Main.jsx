import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Layout, Select, Modal, Button, Input, Checkbox, Tooltip, Menu } from "antd"
import StoredSchedule from "./../../store/container/StoredSchedule"
import StoredComplTasks from "./../../store/container/StoredComplTasks"
import StoreStat from "./../../store/container/StoreStat"
import StoredPatternPref from "../../store/container/StoredPatternPref"
import StoredTEP from "../../store/container/StoredTEP"
import SideBar from "./../SideBar/SideBar"
import Navigation from './../Navigation/Navigation'
import { fill_calendar } from './../../lib/calendar_methods'
import { mainL }  from './../../lang'
import { date_validation, number_validation, string_validation } from './../../lib/validation'
import { task_field_fill } from './../../lib/task_methods'
import { insertColon, sortByTime, changeID } from './../../lib/tools'
import  './Main.less'
const { Header, Content, Footer } = Layout
const { Option } = Select
const InputGroup = Input.Group
const inputStyle = {
  marginTop: 5,
  marginBottom: 10,
  width: '90%',
  fontSize: '1.2rem'  
} 
const Main = ({store, _setCalendar, _choseDay, _langChange, _setWeekdaysPattern,
   _toggleModePatternModal, _setSchedule, _togglePatternModal, _setWeekendsPattern}) => { 
  const { core, ui, ux } = store
  const { weekdays, weekends } = core
  const [task_title, set_task_title] = useState('')
  const [task_id, set_task_id] = useState('')
  const [task_start, set_task_start] = useState('')
  const [task_end, set_task_end] = useState('')
  const [task_exclusivity, set_task_exclusivity] = useState(false)
  const [task_compressibility, set_task_compressibility] = useState(false)
  const [task_urgent, set_task_iurgent] = useState(false)
  const [task_importance, set_task_importance] = useState('')
  const [editID, set_editID] = useState('0')
  const state = [task_title, task_id, task_start, task_end, task_exclusivity, task_compressibility, task_urgent, task_importance]
  const set_state = [set_task_title, set_task_id, set_task_start, set_task_end, set_task_exclusivity, set_task_compressibility, set_task_iurgent, set_task_importance]
  const state_value = ['', '', '', '', false, false, false, '']

  useEffect(() => {
    if(Object.entries(store.core.calendar).length === 0 && store.ux.completedFillPattern){
      _setCalendar(fill_calendar(weekdays, weekends))
      }
    }
  )
  
  const add = () => {
    ui.pattern_modal_mode ? 
    _setWeekendsPattern(changeID(sortByTime([...weekends, task_field_fill(...state)]))) :
    _setWeekdaysPattern(changeID(sortByTime([...weekdays, task_field_fill(...state)]))) ;
    clearState()
  }
  const remove = id => ui.pattern_modal_mode ? _setWeekendsPattern(weekends.filter(v=>v.id!==id)) :
                                             _setWeekdaysPattern(weekdays.filter(v=>v.id!==id))
  const close = () => ui.pattern_modal_mode? _togglePatternModal(weekdays, weekends) : _toggleModePatternModal()      // будет ощибка!
  const done = () => ui.pattern_modal_mode ? _togglePatternModal(weekdays, weekends) : _toggleModePatternModal()
  const clearState = () => set_state.map( (v, i) => v(state_value[i]))
  const langChange = e => _langChange(e)
  const inputTask = e => {
      const { value, id } = e.target;
      set_state[id](value)
  }
  const checkTask = e => {
    const { checked, id } = e.target;
    set_state[id](checked)
  }
    return (     
      <Router>               
          <Layout className="time_saver">
            <Header className="time_saver_header">
              <h1>{mainL[store.ux.lang].title}</h1>
              <Select defaultValue={store.ux.lang} onChange={langChange} className='langChange'>
                <Option value="En">English</Option>
                <Option value="Ru">Русский</Option>
                <Option value="es">Espanol</Option>
                <Option value="fr">Franch</Option>
                <Option value="de-DE">German</Option>
                <Option value="zh-Hans">zh-Hans</Option>               
              </Select>
            </Header> 
            <Navigation lang={store.ux.lang} />           
            <Content className="time_saver_content">
            <Layout>
              <SideBar choseD={_choseDay} store={store} 
                        setSched={_setSchedule} />
              <Switch>
                  <Route exact path='/' component={StoredSchedule}/>
                  <Route path='/compl' component={StoredComplTasks}/>
                  <Route path='/stat' component={StoreStat}/>
                  <Route path='/set' component={StoredPatternPref}/>
                  <Route path='/tep' component={StoredTEP}/>
                  <Route path='/set' component={StoredPatternPref}/>
                </Switch>
              <Modal 
                    title={!ui.pattern_modal_mode ? mainL[ux.lang].weekdays : mainL[ux.lang].weekends} 
                    visible={ui.pattern_modal_visible}
                    cancelText={mainL[ux.lang].return}
                    okText={mainL[ux.lang].add}
                    centered={true}
                    onCancel={close}
                    footer={            
                  <Layout className="footer">
                          <Button onClick={ add }>{mainL[ux.lang].add_task}</Button>
                          <Button onClick={ done }>{mainL[ux.lang].done}</Button>
                          <Button onClick={ close }>{mainL[ux.lang].return}</Button>
                  </Layout>}
                  >
                  <Layout className='start_modal'>
                   <Layout className="start-modal-input"> 
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
                  </Layout>
                   <Layout className='start-modal-pattern'>
                    <Menu theme='dark' mode="inline">                
                    {core[ui.pattern_modal_mode ? 'weekends': 'weekdays'].length ? 
                        core[ui.pattern_modal_mode ? 'weekends': 'weekdays'].map(item=>
                        <Menu.Item key={item.id} style={{ borderRadius: "0 5px 5px 0" }} onClick={() => remove(item.id)}>        
                        <span>{item.title.toUpperCase() + ' Start: ' + insertColon(item.start)}</span>
                        </Menu.Item>) : <Menu.Item>{mainL[ux.lang].no_entries}</Menu.Item>}
                    </Menu>                                      
                  </Layout>                   
                  </Layout>
                  </Modal>
              </Layout> 
            </Content>
            <Footer className="time_saver_footer">&copy; My Company</Footer>
          </Layout>        
      </Router>
    );
  }

export default Main

