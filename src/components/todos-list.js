import _ from 'lodash';
import React from 'react';
import TodosListHeader from './todos-list-header';
import TodosListItem from './todos-list-item';
import shallowCompare from 'react-addons-shallow-compare';
import shallowequal  from 'shallowequal';

export default class TodosList extends React.Component {
    //test if this works
    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }

    renderItems() {
        const props = _.omit(this.props, 'todos');

        return this.props.todos.map((todo, index) => <TodosListItem key={index} task={todo.get("task")} priority={todo.get("priority")} isCompleted={todo.get("isCompleted")} toggleTask={props.toggleTask} saveTask={props.saveTask} deleteTask={props.deleteTask} />);
    }

    render() {
        console.log('item list render');
        return (
            <table>
                <TodosListHeader />
                <tbody>
                    {this.renderItems()}
                </tbody>
            </table>
        );
    }
}
