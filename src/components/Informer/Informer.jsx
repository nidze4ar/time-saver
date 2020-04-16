import React, { useState } from 'react';
import { Layout, Radio, Button } from 'antd';
import { rand } from './../../lib/tools'
import { informL } from './../../lang/informL'
import './Informer.less'
const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const IECast = ({ message, result }) => <Layout><p>{ message } { result }</p></Layout>

 const IEFreeTime = ({getDesidion, lg}) => {  
  const [val, setVal] = useState(0)
  const onChange = e => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>{informL[lg].free_time_title}</p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          {informL[lg].free_time_cancel}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {informL[lg].free_time_fuckup_dedline}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {informL[lg].free_time_increase}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {informL[lg].free_time_ignore}
        </Radio>
        <Radio style={radioStyle} value={5}>
          {informL[lg].free_time_decrease}
        </Radio>
        <Radio style={radioStyle} value={6}>
          {informL[lg].free_time_discrete}
        </Radio>
        <Radio style={radioStyle} value={9}>
          dysplaySchedule
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>{informL[lg].choose}</Button>
    </Layout>
  )
}

 const IEThroughtTime = ({getDesidion, lg}) => {
  const [val, setVal] = useState(0)
  const onChange = e => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>В размечаемом периоде недостаточно свободного времени.
        Выберете решение:
      </p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          {informL[lg].free_time_cancel}
        </Radio>
        <Radio style={radioStyle} value={2}>
          {informL[lg].free_time_fuckup_dedline}
        </Radio>
        <Radio style={radioStyle} value={3}>
          {informL[lg].free_time_increase}
        </Radio>
        <Radio style={radioStyle} value={4}>
          {informL[lg].free_time_ignore}
        </Radio>
        <Radio style={radioStyle} value={5}>
          {informL[lg].free_time_discrete}
        </Radio>
        <Radio style={radioStyle} value={6}>
          {informL[lg].free_time_decrease}
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>Choose</Button>
    </Layout>
  )
}

 const IETotalTime = ({getDesidion, lg}) => {  
  const [val, setVal] = useState(0)
  const onChange = e => setVal(e.target.value)
  const chooseDesidion = () => getDesidion(val)
  return(
    <Layout>
      <p>В размечаемом периоде недостаточно свободного времени.
        Выберете решение:
      </p>
      <Radio.Group onChange={onChange} value={val}>
        <Radio style={radioStyle} value={1}>
          Отменить выполнение
        </Radio>
        <Radio style={radioStyle} value={2}>
          Отсрочить дедлайн 
        </Radio>
        <Radio style={radioStyle} value={3}>
          Увеличить свободное место периода
        </Radio>
        <Radio style={radioStyle} value={4}>
          Игнорировать недостаток свободного времени
        </Radio>
        <Radio style={radioStyle} value={5}>
          Уменишить трудоемкость задачи
        </Radio>
        <Radio style={radioStyle} value={6}>
          Записывать задачу раздельно в течении одного дня
        </Radio>       
      </Radio.Group>
      <Button type="primary" onClick={chooseDesidion}>Choose</Button>
    </Layout>
  )
}

const IEDoneThroughTime = ({periods, setPeriod, lg}) => {
  const [per, setPer] = useState(0)
  const onChange = e => setPer(e.target.value)
  const choosePeriod = () => setPeriod(per)
  return(
    <Layout className='lay_throughTime'>
      <p>
        Выберете сквозной период:
      </p>
      <Radio.Group className='rg_throughTime' onChange={onChange} value={per}>
      {periods ? periods.map(v => 
        <Radio value={v.start} key={rand()} className='r_throughTime'>
          <p>{`${v.start}-${Math.ceil(v.freeIime)}`}</p>
        </Radio>) : <div>No</div>}
      </Radio.Group>
      <Button type="primary" onClick={choosePeriod}>Choose период</Button>
    </Layout>
  )
}
 
const IEDysplaySchedule = ({ periods }) => periods.map(v =><p>{v[0].title}</p>)
     
  

 const Informer = ({error, getDesidion, tempArr, setPeriod, lg, dedPostpon, result}) => {
   switch(error){
    case 'Error_non_dedline': 
    case 'Done:_postponemented_successfully': 
    case 'Done: increaseFreeTime': 
    case 'Done: decreaseTaskLabour': 
    return(
      <Layout className='Error_non_dedline'>
        <IECast message={error} result={result} lg={lg} />
      </Layout>
    )
     case 'Error_free_time': return(
      <Layout className='Error_free_time'>
        <IEFreeTime getDesidion={getDesidion}lg={lg} />
      </Layout>
    )
    case 'Error_throught_time': return(
      <Layout>
        <IEThroughtTime lg={lg} />
      </Layout>
    )
    case 'Error_total_time': return(
      <Layout>
        <IETotalTime lg={lg} />
      </Layout>
    )
    case 'Done:_dysplaySchedule': return(
      <Layout>
        <IEDysplaySchedule lg={lg} />
      </Layout>
    )
    case 'Done:_through_times_is_recd': return(
      <Layout>
        <IEDoneThroughTime periods={tempArr} setPeriod={setPeriod} lg={lg} />
      </Layout>
    )
    case 'Done:_successfully': return(
      <Layout>
        <p>Done:_successfully</p>
      </Layout>
    )  
      
    default: return(
      <Layout>
        <p>NULL</p>
      </Layout>
    )  
   }  
}
export default Informer