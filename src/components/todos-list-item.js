import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate? todos-list-item.js');
        console.log(this.state !== nextState || this.props.task !== nextProps.task || this.props.priority !== nextProps.priority || this.props.isCompleted !== nextProps.isCompleted);
        return (this.state !== nextState || this.props.task !== nextProps.task || this.props.priority !== nextProps.priority || this.props.isCompleted !== nextProps.isCompleted  );
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
