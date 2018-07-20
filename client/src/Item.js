import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation } from 'react-apollo';
import { storeKeyNameFromField } from 'apollo-utilities';


class Item extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            task: this.props.task
        };
        //console.log(this.props.task.item);
    }

    render()
    {
        return(
        <Mutation mutation={markCompletedQuery}>
            {(updateItem, {data})=> (

            
            <tr key={this.props.task.id}>
                <td id={this.props.task.item} crossed={this.props.task.isDone}>
                    <input type="checkbox" checked={this.props.task.isDone} className = "checkbox" onChange={() => updateItem({variables:{id:this.props.task.id,item:this.props.task.item,isDone:!this.props.task.isDone}})}/>
                    <p>{this.props.task.item}</p>
                </td>
            </tr>
            )}
        </Mutation>
        );
    }
}

const markCompletedQuery = gql`
mutation updateItem($id: String!, $item: String! $isDone: Boolean!) {
    updateItem(id: $id, item: $item, isDone: $isDone){
        id
        item
        isDone
    }
}`;

export default graphql(markCompletedQuery, {name: 'updateItem'})(Item);