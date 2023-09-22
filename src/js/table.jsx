import React, {useContext} from 'react'
import Table from 'react-bootstrap/Table'
import { TaskContext } from './todoApp.jsx'

export default function RenderTable() {

  const { selectTask, setSelectTask, arrayTask, setArrayTask } = useContext(TaskContext)

  const handlerClickTask = (e) => {

    if(selectTask !== parseInt(e.currentTarget.dataset.id)){
      setSelectTask(e.currentTarget.dataset.id);
    }
    if(selectTask == parseInt(e.currentTarget.dataset.id)){
      setSelectTask(null);
    }

  }

  return(
    <Table striped bordered hover>
      <thead>
      <tr>
        <td>Name</td>
        <td>Age</td>
        <td>subscription</td>
        <td>employment</td>
      </tr>
      </thead>
      <tbody>

      {arrayTask.map((item, index) => {
        return (
          <tr data-id={index} key={index + item} onClick={handlerClickTask}
              className={'table__row' + (parseInt(selectTask) === index ? ' selected' : '')}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.type}</td>
            <td>{item.employed === true ? 'employed' : 'not employed'}</td>
          </tr>
        )
      })}
      </tbody>
    </Table>

  )
}
