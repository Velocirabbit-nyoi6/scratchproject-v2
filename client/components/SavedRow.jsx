import React from 'react';

const SavedRow = (props) => {
    const {name} = props

    return (
        <tr>
            <td>{name}</td>
        </tr>
    );
}

export default SavedRow;