import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';
import { storeKeyNameFromField } from 'apollo-utilities';


class Item extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tasks: this.props.tasks
        };
        this.deleteTask.bind(this.props.deleteTask);
        this.checkTask.bind(this.props.checkTask);
    }


    checkTask(task)
    {
        this.props.checkTask(task);
    }

    deleteTask(task)
    {
        this.props.deleteTask(task);
    }

    render()
    {
        //console.log("items", this.state.tasks);
        return(
            this.props.tasks.map((currentTask)=>
                <tr key={currentTask.id}>
                    <td id={currentTask.id}>
                        <input type="checkbox" checked={currentTask.isDone} className = "checkbox" onChange={() => this.checkTask(currentTask)} />
                        <p>{currentTask.item}</p>
                        <button onClick={()=> this.deleteTask(currentTask)}> Delete Item </button>
                    </td>
                </tr>
            )
        );
    }
}


export default Item;