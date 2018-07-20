import React from 'react';

const Item = (props) => (
    <tr>
        <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
            <div className="card-body">
                <h5 className="card-title">{props.task.item}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{`Completed: ${props.task.isDone}`}</h6>
            </div>
        </div>
    </tr>

);

export default Item;