import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import shallowequal  from 'shallowequal';

export default class TodosListHeader extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
    }
    render() {
        console.log('header render');
        return (
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Action</th>
                    <th>Priority</th>
                </tr>
            </thead>
        );
    }
}
