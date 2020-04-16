import React, { useEffect } from "react";
import { Layout, Calendar } from "antd";
import { dExt } from './../../lib/date_methods'
import { schedule_render } from './../../lib/calendar_methods'

const { Sider } = Layout

const SideBar = ({store, choseD, setSched}) => {
  const { schedule, chosenDay } = store.core
  useEffect(() => {
    if(!schedule.length  && store.ux.completedFillPattern ){
        handleClick({_d: new Date().toString()} )
      }
    }
  )
  const handleClick = (dateString) => {    
    choseD(dExt(dateString) )
    setSched(schedule_render(chosenDay, store))    
  }
    return (
      <Sider width={320} style={{ background: "#fff" }} breakpoint="sm" collapsedWidth="0">
         <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar fullscreen={false} onChange={handleClick} className='calendar' />
        </div>       
      </Sider>
    );
  }

export default SideBar
