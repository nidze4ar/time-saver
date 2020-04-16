import React from 'react'
import { Layout, InputNumber } from "antd"
import { mainL }  from './../../lang'

const TimeEstimatePreference = ({SAE, SAS, SAP, setMinimumTaskTime, store}) => {
  const { ux } = store
  return(
    <Layout>
      <p>This will set TimeEstimatePreference </p>
      <InputNumber addonBefore={mainL[ux.lang].tep_sae} min={1} max={10}
         onChange={SAE} id='3'
         placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].tep_sae} value={ux.aggressivenessExclude}/>
      <InputNumber addonBefore={mainL[ux.lang].tep_sas} min={1} max={10}
          onChange={SAS} id='3'
          placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].tep_sae} value={ux.aggressivenessSqueezing}/>
      <InputNumber addonBefore={mainL[ux.lang].tep_sap} min={1} max={10}
          onChange={SAP} id='3'
          placeholder={mainL[ux.lang].insert + ' ' +  mainL[ux.lang].tep_sae} value={ux.aggressivenessPermutation}/>
    </Layout>
  )
}

export default TimeEstimatePreference