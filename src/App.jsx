import React, { useEffect, useState } from 'react';
import { Space, Radio, Table, Flex } from 'antd';
import api from './api/instanse';
import './App.css'

const App = () => {
  const { Column, ColumnGroup } = Table;
  const [input_value, setInputValue] = useState('')
  const [data, setdata] = useState(0)
  const [nf, setnf] = useState('none')
  const [Update_Input, setUpdate_Input] = useState('')
  const [s, sets] = useState('')

  const data_funtion = async () => {
    setdata(await api.get('/posts'))
  }

  data_funtion()

  const Input_value = (e) => {
    setInputValue(e)
  }

  useEffect(() => {
    data
  }, [])

  const Create = () => {

    let c = {
      id: input_value,
      title: input_value,
    }

    api.post('http://localhost:3000/posts', c, function (data, status) { alert("Data: " + data + "Status: " + status); })
  }
  const Delete_Update = (e) => {
    if (e.target.innerText == 'delete') {
      let sa = data.data[0].id
      api.delete(`/posts/${sa}`)
    }

    if (e.target.innerText == 'update') {
      setnf('flex')
    }
  }
  const Update = (e) => {
    setnf('none')
    setUpdate_Input(s)
    let sa = data.data[0].id
    // console.log(data.data[0].id);
    let sde = {
      id: s,
      title: s,
    }
    api.patch(`/posts/${sa}`, sde)
  }
  const Update_input = (e) => {
    sets(e.target.value)
  }

  useEffect(() => {
    App
  }, [data])
  let aas = 0

  return (
    <>
      <input onChange={(e) => Input_value(e.target.value)} type="text" />
      <button onClick={(e) => Create(e)}>Create</button>
      <input onChange={(e) => Update_input(e)} className={nf} type="text" />
      <button onClick={(e) => Update(e)} className={nf}>update</button>
      <Table dataSource={data.data}>
        <Column dataIndex="title" key="title" >
        </Column>
        {aas++}
        <Column
          key="action"
          render={() => (
            <Space onClick={(e) => Delete_Update(e)} size="middle">
              <button>update</button>
              <button>delete</button>
            </Space>
          )}
        />
      </Table>
    </>
  )
}

export default App;