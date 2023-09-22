import React from 'react'
import TodoApp from './todoApp.jsx'
class Template extends React.Component {
    render() {
        return (
            <div className={'container px-4'}>
                <TodoApp/>
            </div>
        )
    }

}

export default Template;
