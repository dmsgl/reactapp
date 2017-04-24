import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import shallowequal  from 'shallowequal';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    // The main advantage of using Immutable objects come from the ability to use shallow compare, 
    // which makes comparison involving deeply nested structures inexpensive. Another advantage is
    // more maintainable code as you don't have to compare primitive values directly and can use
    // a generic function that works for any component

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }

    render() {
        console.log('item render');
        const { task, priority, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <tr onSubmit={this.onSaveClick.bind(this)}>
                    
                    <td>
                        <input type="text" defaultValue={task} ref="editInput" />
                    </td>

                    <td>
                        <input type="text" defaultValue={priority} ref="editInput2" />
                    </td>
                    <td>
                        <button onClick={this.onSaveClick.bind(this)}>Save</button>
                        <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
                    </td>
                </tr>
            );
        }

        return (
            <tr>
                <td style={taskStyle}
                    onClick={this.props.toggleTask.bind(this, task)}
                >
                    {task}
                </td>
                <td style={taskStyle}
                    onClick={this.props.toggleTask.bind(this, task)}
                >
                    {priority}
                </td>
                <td>
                    <button onClick={this.onEditClick.bind(this)}>Edit</button>
                    <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
                </td>
            </tr>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props;
        const newTask = 
        {
            task: this.refs.editInput.value,
            priority: this.refs.editInput2.value,
            isCompleted: false
        };
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }
}
