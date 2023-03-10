import React, { Component } from 'react'

export default class Todo extends Component {
    deleteHandler(id){
        this.props.onDelete(id)
    }
    editHandler(id){
        this.props.onEdit(id)
    }
  render() {
    return (
      <>
        <div className={`todo ${this.props.isCompleted ? 'completed':''} `} style={{ display: 'flex' }}>
            <li className="todo-item">{this.props.title}</li>
            <button className="check-btn" onClick={this.editHandler.bind(this,this.props.id)}>
                <i className="fas fa-check" aria-hidden="true"></i>
            </button>

            <button className="trash-btn" onClick={this.deleteHandler.bind(this,this.props.id)}>
                <i className="fas fa-trash" aria-hidden="true"></i>
            </button>
        </div>
      </>
    )
  }
}
