import React from 'react'
import { Layout, Button } from "antd"
import { fill_calendar } from './../../lib/calendar_methods'

const PatternPreference = ({_setCalendar}) => (
    <Layout>
      <p>This will delete the entire calendar</p>
      <Button onClick={()=>_setCalendar(fill_calendar([], []))}>ClearCal</Button>
    </Layout>
)
export default PatternPreference