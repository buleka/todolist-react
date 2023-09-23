import React, { createContext, useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ThemeContext, ThemeProvider } from './themeMode.jsx'
import RenderTable from './table.jsx'
import dataUsers from './data.js';

const dataArray = JSON.parse(localStorage.getItem('dataArray')) || dataUsers;

export const TaskContext = createContext(null)

export const TaskProvider = (props) => {

  const [selectTask, setSelectTask] = useState()
  const [arrayTask, setArrayTask] = useState(dataArray)


  return (
    <TaskContext.Provider value={{ selectTask, setSelectTask, arrayTask, setArrayTask }}>
      {props.children}
    </TaskContext.Provider>
  )
}


export const Element = () => {
  const [theme, setTheme] = useContext(ThemeContext)
  const { selectTask, setSelectTask, arrayTask, setArrayTask } = useContext(TaskContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  localStorage.setItem('dataArray', JSON.stringify(arrayTask))


  const onSubmit = (data) => {
    setArrayTask((prevState) => [...prevState, data])
  }

  const handlerDelete = (e) => {
    e.preventDefault()
    const updatedArray = arrayTask.filter((item, index) => index !== parseInt(selectTask))
    setArrayTask(updatedArray)
    setSelectTask(null)
  }

  return (
    <div data-bs-theme={theme}>
      <div className={'element card'}>
        <div className={'grid'}>
          <div className={'grid__item'}>
            <div className={'card'}>
              <div className={'card-body'}>
                <div>
                  <h5 className={'card-title'}>Insert Row</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset>
                    <div className={'mb-3'}>
                      <input
                        className={'form-control' + (errors.name ? ' is-invalid' : '')} {...register('name', { required: true })}
                        type='text'
                        placeholder={'Name'} />
                    </div>
                    <div className={'mb-3'}>
                      <input {...register('age', { required: true , min: 18, max: 99})}
                             className={'form-control' + (errors.age ? ' is-invalid' : '')}
                             type='number'
                             placeholder={'Age'} />
                    </div>
                    <div className={'mb-3'}>
                      <select className={'form-select'}
                              aria-label='Default select example'  {...register('type', { required: true })}>
                        <option>subscribed</option>
                        <option>not subscribed</option>
                        <option>other</option>
                      </select>
                      {errors.type && <span>This field is required</span>}
                    </div>
                    <div className={'mb-3'}>
                      <div className='form-check'>
                        <input id='flexCheckDefault' className={'form-check-input'} {...register('employed')}
                               type='checkbox' />
                        <label className={'form-check-label'} htmlFor='flexCheckDefault'>Employed</label>
                      </div>
                    </div>
                    <div className={'mb-3 d-grid'}>
                      <button type='submit' className={'btn btn-primary'}>Insert</button>
                    </div>
                  </fieldset>
                  <hr/>
                  <div className={'mb-3'}>
                    <SwitchTheme />
                  </div>
                  <div className={'mb-3 d-grid'}>
                    <button className={'btn btn-danger'} onClick={handlerDelete}>Delete</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div className={'grid__item'}>
            <div>
              <RenderTable />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


const SwitchTheme = () => {
  const [theme, setTheme] = useContext(ThemeContext)

  const handlerTheme = (e) => {
    e.target.checked ? setTheme('dark') : setTheme('light')
  }

  return (
    <div className={'form-check form-switch'}>
      <input className={'form-check-input'} type='checkbox' role='switch' id='flexSwitchCheckDefault'
             onChange={handlerTheme} />
      <label className={'form-check-label'} htmlFor='flexSwitchCheckDefault'>Mode</label>
    </div>
  )
}


export default function TodoApp() {

  return (
    <ThemeProvider>
      <TaskProvider>
        <Element />
      </TaskProvider>
    </ThemeProvider>

  )
};
