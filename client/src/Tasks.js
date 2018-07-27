import React, {Component} from 'react';
import gql from 'graphql-tag';
import Item from './Item';
import {graphql, compose} from 'react-apollo';

//This class/react component is called from App.js and handles our graphql data changes and the state of the data
//for our item list/table
class Tasks extends Component
{
    //Contructor sets up our props from parent and creates the state of the data for this component
    constructor(props)
    {
        super(props);
        this.state = {
            term: '',
            error: null,
            tasks: this.props.data
        };
        //Here we manually bind our methods because they do not automatically bind
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeText = this.changeText.bind(this);
        
    }

    //This method is used for when a user enters a new to-do item to our list
    handleSubmit(e) 
    {
        e.preventDefault();
        //First we do some input validation to make sure they have actually typed in an item
        if(this.state.term.replace(/^\s+/g, '').length < 1)
        {
            //If they havent typed in an item to the textbox we display a warning to let them know
            var warning = document.getElementById('warning');
            warning.style.visibility = "visible";
            this.setState(
            {
                term: ''
            });
            return;
        }
        else
        {
            //We get here if a non empty string for a to-do list item is entered
            var warning = document.getElementById('warning');
            warning.style.visibility = "hidden";

            //In this call we are making a mutation call to graphql to add the new to-do item to the database 
            //In the update part of the function we also add the new item to the current Tasks state so it will
            //be reflected in our table
            this.props.addItem(
            {
                variables:
                {
                    item: this.state.term,
                    isDone: false
                },
                update: (store, {data: {addItem}}) => 
                {
                    this.setState({
                        term: '',
                        tasks: [...this.state.tasks,addItem]
                    });
                }
            }).then(function getResponse(response){
                console.log(response);
            });
        }
    }
    //This method allows for the text inside the text-input box to appear when a user types
    onChange = (event) =>
    {
        this.setState({term: event.target.value});
    }

    //This method is called when a user wants the edit a tasks value, it calls the graphql update item mutation
    //and updates the item in the database as well as updates the items value in the Tasks state
    changeText(task,newText)
    {
        this.props.updateItem({
            variables:{
                id: task.id,
                item: newText,
                isDone: task.isDone
            },
            update: (store, {data:{updateItem}}) =>
            {
                const data = this.state.tasks.slice();
                const index = data.findIndex(task => task.id === updateItem.id);
                data[index] = updateItem;
                this.setState({
                    tasks: data
                });
            }
        });
    }

    //This method is called when a user checks off a task in the UI
    //It updates the isDone value in the database through graphql and updates it in the state aswell so it is reflected
    //in the rendered data
    checkTask(task)
    {
        this.props.updateItem({
            variables:{
                id: task.id,
                item: task.item,
                isDone: !task.isDone
            },
            update: (store, {data:{updateItem}}) =>
            {
                const data = this.state.tasks.slice();
                const index = data.findIndex(task => task.id === updateItem.id);
                data[index] = updateItem;
                this.setState({
                    tasks: data
                });
                //return updateItem;
            }
        });
    }
    //This function is called when a user presses delete on a to-do item, it calls the remove graphql mutation
    //and then removes the item from the state aswell
    deleteTask(task)
    {
        this.props.removeItem(
        {
            variables:
            {
                id: task.id
            },
        }).then(function getResponse(response)
        {
            console.log(response);
        });
        this.setState(prevState => ({
            tasks: prevState.tasks.filter(el => el != task)
        }));
        
    }

    //In this render we create our form for when a user wants to add a new task and 
    //we call the Item react component to create our table rows filled with all of the tasks from our database
    render()
    {
        return(
            <div className="dataCenter">
                <form className="table" onSubmit={this.handleSubmit}>
                    <input value={this.state.term} onChange={this.onChange}/>
                    <p id="warning"> Please type in a unique item to add it to the To-Do list!</p>
                    <button>Submit</button>
                </form>
                <div className="tableDiv">
                    <table className="table-bordered table-hover">
                        <tbody>
                            <Item tasks={this.state.tasks} deleteTask={this.deleteTask.bind(this)} checkTask={this.checkTask.bind(this)} changeText={this.changeText.bind(this)}/>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

//Below are all of the graphql/apollo quieries used above to change the data in the database or return it

const taskQuery = gql`
  query todoList {
    tasks {
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

const ADD_TODO = gql`
    mutation addItem($item: String!, $isDone: Boolean!){
      addItem(item: $item, isDone: $isDone){
        id
        item
        isDone
      }
    }`;

const markCompletedQuery = gql`
    mutation updateItem($id: String!, $item: String! $isDone: Boolean!) {
        updateItem(id: $id, item: $item, isDone: $isDone){
            id
            item
            isDone
        }
    }`;

//In our export statement we compose a list of the graphql quieries/mutations that we use and also export
//the task component itself
export default compose(graphql(deleteItem,{name: 'removeItem'}),
graphql(taskQuery,{name: 'getTasks'}),
graphql(ADD_TODO,{name: 'addItem'}),graphql(markCompletedQuery,{name: 'updateItem'}))(Tasks);
