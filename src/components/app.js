import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import Immutable from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';
import shallowequal  from 'shallowequal';

const todosVanilla = [
{
    task: 'play Overwatch',
    priority: 'Urgent',
    isCompleted: false

},
{
    task: 'watch anime',
    priority: 'Urgent',
    isCompleted: true
},
{
    task: 'eat supper',
    priority: 'Urgent',
    isCompleted: true
}
];

var todos = Immutable.fromJS(todosVanilla);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.toggleTask = this.toggleTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.createTask = this.createTask.bind(this)

        this.state = {
            todos: todos
        };
    }

    render() {
        console.log('app render');
        return (
            <div>
                <h1>ToDo App</h1>
                <CreateTodo todos={this.state.todos} createTask={this.createTask} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask}
                    saveTask={this.saveTask}
                    deleteTask={this.deleteTask}
                />
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }

    toggleTask(task) {
        console.log('toggleTask');

        const myList = this.state.todos;
        const searchList = this.state.todos.toJS();
        // converting an Immutable to a plain JS object is expensive
        const foundTodo = _.find(searchList, todo => todo.task === task);    
        foundTodo.isCompleted = !foundTodo.isCompleted;
        const mapUpdateFunc = () => foundTodo.isCompleted;
        const index = _.findIndex(searchList, todo => todo.task === task);
        const listUpdateFunc = m => m.update("isCompleted", mapUpdateFunc);
        this.setState(({todos}) => ({
          todos: myList.update(index, listUpdateFunc)
        }));


    }

    createTask(task, priority) {
        console.log('createTask');

        const myList = this.state.todos;  
        const tempArray = {
            task: task,
            priority: priority,
            isCompleted: false
        };
        const tempMap = Immutable.Map(tempArray);

        this.setState(({todos}) => ({
          todos: myList.push(tempMap)
        }));



    }

    saveTask(oldTask, newTask) {
        console.log('saveTask');

        const myList = this.state.todos;
        const searchList = this.state.todos.toJS();
        // converting an Immutable to a plain JS object is expensive
        const foundTodo = _.find(searchList, todo => todo.task === oldTask.task);    
        const mapUpdateFunc = () => newTask.task;
        const mapUpdateFunc2 = () => newTask.priority;
        const index = _.findIndex(searchList, todo => todo.task === oldTask.task);  
        const listUpdateFunc = m => m.update("task", mapUpdateFunc).update("priority", mapUpdateFunc2);
        this.setState(({todos}) => ({
          todos: myList.update(index, listUpdateFunc)
        }));

    }

    deleteTask(taskToDelete) {
        console.log('deleteTask');

        const myList = this.state.todos;
        const searchList = this.state.todos.toJS(); 
        // converting an Immutable to a plain JS object is expensive 
        const index = _.findIndex(searchList, todo => todo.task === taskToDelete);
        this.setState(({todos}) => ({
          todos: myList.delete(index)
        }));

    }
}