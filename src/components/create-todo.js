import React from 'react';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }

    render() {
        console.log('ONLY RENDER AFTER A CREATE ACTION');
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <input type="text" placeholder="What do I need to do?" ref="createInput" />
                <input type="text" placeholder="How important is this?" ref="createInput2" />
                <button>Create</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const createInput2 = this.refs.createInput2;
        const task = createInput.value;
        const priority = createInput2.value;
        const validateInput = this.validateInput(task);

        if (validateInput) {
            this.setState({ error: validateInput });
            return;
        }
        if(this.state.error !== null) {
            this.setState({ error: null });
        }
        this.props.createTask(task, priority);
        this.refs.createInput.value = '';
        this.refs.createInput2.value = '';
    }

    validateInput(task) {
        if (!task) {
            return 'Please enter a task.';
        } else if (_.find(this.props.todos, todo => todo.task === task)) {
            return 'Task already exists.';
        } else {
            return null;
        }
    }

}
