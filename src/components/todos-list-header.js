import React from 'react';

export default class TodosListHeader extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        console.log('NEVER RENDER THIS TWICE');
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
