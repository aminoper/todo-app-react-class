import React, { Component } from 'react'
import Todo from './Todo'
import Header from './Header'

export default class TodoList extends Component {
    constructor(){
        super()
        this.state = {
            todoTitle : '',
            todos : [],
            status : 'all'
        }
        this.input = React.createRef()

        this.changeInputHandler = this.changeInputHandler.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.editTodo = this.editTodo.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }
// event methodes==========================================================================
    changeInputHandler(event){
        this.setState({
            todoTitle : event.target.value
        })
    }
    addTodo(event){
        event.preventDefault()
        let newtodos = {
            id : this.state.todos.length + 1 ,
            title : this.state.todoTitle ,
            isCompleted : false
        }
        this.setState(prevState =>{
            if(this.state.todoTitle){
                return {
                    todos : [...prevState.todos , newtodos],
                    todoTitle : ''
                }
            }
        })
        this.input.current.focus()

    }
    deleteTodo(todoId){
        let newTodos = this.state.todos.filter(todo => {
            return todo.id !== todoId
        })
        this.setState({
            todos : newTodos
        })
    }
    editTodo(todoId) {
        let newTodos = [...this.state.todos]
         newTodos.forEach(todo => {
            if(todo.id === todoId){
                return todo.isCompleted = !todo.isCompleted
            }
        })
        this.setState({
            todos : newTodos
        })
    }
    changeStatus(event){
        this.setState({
            status : event.target.value
        })
    }

// event methodes===========================================================================

  render() {
    return (
      <>
        <div className='main'>
            <Header></Header>
            
            <form onSubmit={this.addTodo} >
                <div>
                    <input type="text" ref={this.input} value={this.state.todoTitle} onChange={this.changeInputHandler} className="todo-input" maxLength="40"/>
                    <button className="todo-button"  type="submit" >
                        <i className="fas fa-plus-square"></i>
                    </button>
                </div>
                <div className="select" onChange={this.changeStatus} >
                    <select name="todos" className="filter-todo" value={this.state.status}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form>
            <div className="todo-container">
                <ul className="todo-list">

                    {/* filter completed todos ==================================================*/}

                    {this.state.status === 'completed' && this.state.todos.filter(todo => todo.isCompleted).map(todo =>{
                        return <Todo key={todo.id} {...todo} onDelete ={this.deleteTodo} onEdit ={this.editTodo}/>
                    })}

                    {/* filter ucompleted todos =================================================*/}

                    {this.state.status === 'uncompleted' && this.state.todos.filter(todo => !todo.isCompleted).map(todo =>{
                        return <Todo key={todo.id} {...todo} onDelete ={this.deleteTodo} onEdit ={this.editTodo}/>
                    })}
                    
                    {/* filter all todos ========================================================*/}

                    {this.state.status === 'all' &&  this.state.todos.map(todo =>{
                        return <Todo key={todo.id} {...todo} onDelete ={this.deleteTodo} onEdit ={this.editTodo}/>
                    })}

                </ul>
            </div>
        </div>
      </>
    )
  }
}
