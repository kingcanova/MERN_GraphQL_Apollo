import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';

class TableItem extends Component
{
    //In the constructor we set up our state and bind our methods to the parent methods in Tasks.js so that
    //when they are called we can change and reflect the data changes in our UI
    constructor(props)
    {
        super(props);
        this.state = {
            item: this.props.task.item,
            id: this.props.task.id,
            isDone: this.props.task.isDone,
            editing: false
        };
    }

    //This method is called when a user hits the save button after editing a task,
    //it updates the items value in the database to reflect the changes
    saveButton()
    {
        this.props.updateItem({
            variables:{
                id: this.state.id,
                item: this.state.item
            },
            update: (store, {data:{updateItem}}) =>
            {
                this.setState({
                    editing: false,
                    item: this.state.item
                });
            }
        });
    }

    //This method is used to update the item state when a user is editing that item
    onChange = (event) =>
    {
        this.setState({item: event.target.value});
    }

    //This method is used to return the correct data that should be displayed in the table, whether it is being edited
    //or not
    createTask()
    {
        if(this.state.editing === true)
        {
            return(
                <div>
                <input value={this.state.item} onChange={this.onChange}/>
                <p></p>
                <button className="save" onClick={()=> this.saveButton()}> Save Item</button>
                </div>
            );
        }
        else
        {
            return(
                <div>
                <p id={this.state.id}>{this.state.item}</p>
                <button className="edit" onClick={()=> this.editButton()}> Edit Item</button>
                </div>
            );
        }
    }

    //This method is called when a user clicks the edit item button and sets the editing state to true
    editButton()
    {
        this.setState({
            editing: true
        });
    }

    render()
    {
        return(this.createTask());
    }
}

const updateItemQuery = gql`
    mutation updateItem($id: String!, $item: String!) {
        updateItem(id: $id, item: $item){
            id
            item
            isDone
        }
    }`;

//At the end we simply export the Item component and the updateItem graphql mutation
export default graphql(updateItemQuery,{name: 'updateItem'})(TableItem);