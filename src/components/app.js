import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import Immutable from 'immutable';

const todosVanilla = [
{
    task: 'make React tutorial',
    priority: 'Urgent',
    isCompleted: false

},
{
    task: 'eat dinner',
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

        this.state = {
            todos: todos.toJS()
        };
    }

    render() {
        return (
            <div>
                <h1>ToDo App</h1>
                <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
                <TodosList
                    todos={this.state.todos}
                    toggleTask={this.toggleTask.bind(this)}
                    saveTask={this.saveTask.bind(this)}
                    deleteTask={this.deleteTask.bind(this)}
                />
            </div>
        );
    }
    //test if this works
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props !== nextProps.props) {
            console.log('>>>>>>>>>>>>>>>>>>>>RERENDER<<<<<<<<<<<<<<<<<<<<');
            return true;
        } else {
            console.log('>>>>>>>>>>>>>>>>>>>>NO RERENDER<<<<<<<<<<<<<<<<<<<<');
            return false;
        }
    }

    //fix this for immutable
    toggleTask(task) {
        console.log('toggleTask');
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        const index = _.findIndex(this.state.todos, todo => todo.task === task);
        
        const tempList = Immutable.fromJS(this.state.todos);
        tempList.setIn([index, 'isCompleted'], foundTodo.isCompleted).toJS();

        this.setState({ todos: tempList.toJS() });

    }

    createTask(task, priority) {
        console.log('createTask');
        //this.state.todos.push({
            //task,
            //isCompleted: false
        //});
        //this.setState({ todos: this.state.todos });
        const tempList = Immutable.fromJS(this.state.todos);
        var tempList2 = tempList.concat({
            task: task,
            priority: priority,
            isCompleted: false
        });
        this.setState({ todos: tempList2.toJS() });

    }
    //fix this for immutable
    saveTask(oldTask, newTask) {
        console.log('saveTask');
        //const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        //foundTodo.task = newTask.task;
        //foundTodo.priority = newTask.priority;
        //this.setState({ todos: this.state.todos });
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask.task);
        foundTodo.task = newTask.task;
        foundTodo.priority = newTask.priority;
        const index = _.findIndex(this.state.todos, todo => todo.task === oldTask.task);
        const tempList = Immutable.fromJS(this.state.todos);
        tempList.setIn([index, 'task'], foundTodo.task).toJS();
        tempList.setIn([index, 'priority'], foundTodo.priority).toJS();

        this.setState({ todos: tempList.toJS() });

    }
    //fix this for immutable
    deleteTask(taskToDelete) {
        console.log('deleteTask');
        //_.remove(this.state.todos, todo => todo.task === taskToDelete);
        //this.setState({ todos: this.state.todos });
        
        const index = _.findIndex(this.state.todos, todo => todo.task === taskToDelete);
        const tempList = Immutable.fromJS(this.state.todos);
        var tempList2 = tempList.delete(index);
        this.setState({ todos: tempList2.toJS() });
        
    }
}
