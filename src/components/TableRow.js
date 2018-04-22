import React from 'react';
import { Link } from 'react-router-dom';

export const TableRow = props => (
    <tr>
        <td>
            {props.obj.id}
        </td>
        <td>
            {props.obj.title}
        </td>
        <td>
            {props.obj.created_at && props.obj.created_at.replace('T', ' ').split('.')[0]}
        </td>
        <td>
            <Link to={"/articles/"+props.obj.id} className="btn btn-primary">Edit</Link>
            <button id={props.obj.id} onClick={props.handleDelete} className="btn btn-danger">Delete</button>
        </td>
    </tr>
);

export default TableRow;