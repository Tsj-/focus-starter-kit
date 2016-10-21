import React, {Component} from 'react';

const ToDo = ({value, onClickDone, onClickClose, done}) => {
    let defaultClass = 'callout';
    defaultClass += done ? ' callout-success' : ' callout-info';
   return (
      <div className={defaultClass}>
        <span><i className="material-icons icon-check" onClick={onClickDone}>check_circle</i></span>
        <span>{value}</span>
        <span><i className="material-icons icon-delete" onClick={onClickClose}>delete</i></span>
      </div>
    )
}

const ToDoList = React.createClass({
  getInitialState: function() {
    return {
      todos: [
        { value:'Be awesome', done: false },
        { value:'Learn React', done: true },
        { value:'Use JSX in my CodePens', done: true }
      ]
    }
  },
  addTodo () {
    const newValue = {
      value: this.state.inputValue,
      done: false
    };
    this.setState({
      todos: [...this.state.todos, newValue],
      inputValue: ''
    });

    return false;
  },
  handleChange (e) {
    this.setState({
      inputValue: e.target.value
    });
  },
  removeTodo(index) {
    const todos = this.state.todos.slice();
    todos.splice(index, 1);
    this.setState({
      todos
    });
  },
  markTodoDone (index) {
    const todos = this.state.todos.slice();
    const newTodo = {...this.state.todos[index]};
    todos.splice(index, 1);
    newTodo.done = !newTodo.done;
    newTodo.done ? todos.push(newTodo) : todos.unshift(newTodo);

    this.setState({
      todos: todos
    });
  },
  render () {

    const todos = this.state.todos.map((todo, index) => {
      return (
        <ToDo
        key={index}
        value={todo.value}
        done={todo.done}
        onClickClose={this.removeTodo.bind(this, index)}
        onClickDone={this.markTodoDone.bind(this, index)}
      /> );
    });

    return (
      <div className='container'>
        <div className='col-xs-6 col-xs-offset-3'>
          <h1>My Todo List</h1>
          {todos}
            <div data-todo='inputs' className="mdl-textfield mdl-js-textfield">
              <label className="mdl-textfield__label" htmlFor='todoInput'></label>
              <input type='text' value={this.state.inputValue}
                onChange={this.handleChange}
                 className="mdl-textfield__input"
                placeholder='What do you need to do?'
              />
              <span className='input-group-btn'>
                 <span><i className="material-icons icon-save" onClick={this.addTodo}>save</i></span>
              </span>
            </div>

        </div>
      </div>
    );
  }
});



export default ToDoList;
