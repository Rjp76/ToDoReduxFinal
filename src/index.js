import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {addTodo} from "./actions";
import {clearTodo} from "./actions";
import {completeTodo} from "./actions";
import {deleteTodo} from "./actions";
import  todoApp from "./reducers";
import './index.css';


//default state
var defaultState = {
    todo: {
        items: []
    }
};
//end reducers
//start store//
const store = createStore(todoApp, defaultState);
//end store
//start components
class AddTodoForm extends React.Component {
    state = {
        message: ''
    };

    onFormSubmit(e) {
        e.preventDefault();
        store.dispatch(addTodo(this.state.message));
        this.setState({ message: '' });
    }

    onMessageChanged(e) {
        var message = e.target.value;
        this.setState({ message: message });
    }

    render() {
        return (

            <form onSubmit={this.onFormSubmit.bind(this)}>
                <input type="text" placeholder="Todo..." onChange={this.onMessageChanged.bind(this)} value={this.state.message} />
                <input type="submit" value="Add" />
            </form>

        );
    }
}

class TodoItem extends React.Component {
    onDeleteClick() {
        store.dispatch(deleteTodo(this.props.index));
    }

    onCompletedClick() {
        store.dispatch(completeTodo(this.props.index));
    }

    render() {
        return (
            <li>
                <a href="#" onClick={this.onCompletedClick.bind(this)} style={{textDecoration: this.props.completed ? 'line-through' : 'none'}}>{this.props.message.trim()}</a>&nbsp;
                <a href="#" onClick={this.onDeleteClick.bind(this)} style={{textDecoration: 'none'}}>[x]</a>
            </li>
        );
    }
}
class ClearItems extends React.Component{
    onClearClick(){
        store.dispatch(clearTodo(this.props));
    }
    render(){
        return(
            <button onClick={this.onClearClick.bind(this)} > Clear</button>
        );
    }
}
class TodoList extends React.Component {
    state = {
        items: []
    };

    componentWillMount() {
        store.subscribe(() => {
            var state = store.getState();
            this.setState({
                items: state.todo.items
            });
        });
    }

    render() {
        var items = [];

        this.state.items.forEach((item, index) => {
            items.push(<TodoItem
                key={index}
                index={index}
                message={item.message}
                completed={item.completed}
            />);
        });

        if (!items.length) {
            return (
                <p>
                    <i>Add something to do</i>
                </p>
            );
        }

        return (
            <ol className="stuff">{ items }</ol>
        );
    }
}
//render, what is seen on screen
ReactDOM.render(
    <div className={"gen"}>
        <h1>Todo</h1>
        <app/>
        <AddTodoForm />
        <ClearItems/>
        <TodoList/>

    </div>,
    document.getElementById('root')
);