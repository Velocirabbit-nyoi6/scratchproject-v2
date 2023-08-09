import React from 'react';

const TriedRow = (props) => {
    const { place } = props
    return (
        <tr>
            <td>{place.name}</td>
            <td>{place.score}</td>
            <td>{place.tags.toString()}</td>
        </tr>
    );s
}

export default TriedRow;