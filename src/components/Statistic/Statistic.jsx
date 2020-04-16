import React from 'react';
import { Layout, Table} from "antd";

const Statistic = ({store}) => {
const columns = [
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Id', dataIndex: 'id', key: 'id' },
  { title: 'Labour', dataIndex: 'labour', key: 'labour' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Remaind', dataIndex: 'remaind', key: 'remaind' },
]
const data = store.core.tasks
  return(
    <Layout>
      <Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.importance}</p>}
        dataSource={data}
      />
    </Layout>
  )
}
export default Statistic