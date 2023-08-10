import React from 'react';

const SavedRow = (props) => {
    

    const { name, deleteFunc } = props;

    return (
        <tr>
            <td>{name}</td>
            <button onClick={() => deleteFunc(name)} type="button" class="btn-close bg-light" aria-label="Close"></button>
        </tr>
    );
}

export default SavedRow;