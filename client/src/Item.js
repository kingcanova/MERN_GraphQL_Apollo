import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';


class Item extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            task: this.props.task,
        };
        //console.log(this.props.task.item);
    }

    deleteTask()
    {

    }

    render()
    {
        return(
        <Mutation mutation={markCompletedQuery}>
            {(updateItem, {data})=> (

            
            <tr key={this.props.task.id}>
                <td id={this.props.task.item} >
                    <input type="checkbox" checked={this.props.task.isDone} className = "checkbox" onChange={() => updateItem({variables:{id:this.props.task.id,item:this.props.task.item,isDone:!this.props.task.isDone}})}/>
                    <p>{this.props.task.item}</p>
                    <Mutation mutation={deleteItem}>
                    {(removeItem, {data})=>(
                    <button onClick={() => removeItem({variables:{id:this.props.task.id}})}> Delete </button>
                    )}
                    </Mutation>
                </td>
            </tr>
            )}
        </Mutation>
        );
    }
}

//CAN PROBABLY REMOVE THE MUTATION FROM HERE HAVE A DELETE BUTTON THAT MAPS BACK TO THE TASKS.JS AND THEN 

const markCompletedQuery = gql`
mutation updateItem($id: String!, $item: String! $isDone: Boolean!) {
    updateItem(id: $id, item: $item, isDone: $isDone){
        id
        item
        isDone
    }
}`;

const deleteItem = gql`
mutation removeItem($id: String!){
    removeItem(id:$id){
        id
        item
        isDone
    }
}`;

export default compose(graphql(markCompletedQuery, {name: 'updateItem'}),
graphql(deleteItem,{name: 'removeItem'}))(Item);