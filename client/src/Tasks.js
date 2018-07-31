import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import TableItem from './TableItem';

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
            tasks: this.props.data,
            warning: false
        };
        //Here we manually bind our methods because they do not automatically bind
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    //This method is used for when a user enters a new to-do item to our list
    handleSubmit(e) 
    {
        e.preventDefault();
        //First we do some input validation to make sure they have actually typed in an item
        if(this.state.term.replace(/^\s+/g, '').length < 1)
        {
            //If they havent typed in an item to the textbox we display a warning to let them know
            this.setState(
            {
                term: '',
                warning: true
            });
            return;
        }
        else
        {
            //We get here if a non empty string for a to-do list item is entered

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
                        tasks: [...this.state.tasks,addItem],
                        warning: false
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

    //This method is called when a user checks off a task in the UI
    //It updates the isDone value in the database through graphql and updates it in the state aswell so it is reflected
    //in the rendered data
    checkTask(task)
    {
        this.props.updateDone({
            variables:{
                id: task.id,
                item: task.item,
                isDone: !task.isDone
            },
            update: (store, {data:{updateDone}}) =>
            {
                const data = this.state.tasks.slice();
                const index = data.findIndex(task => task.id === updateDone.id);
                data[index] = updateDone;
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
    showWarning()
    {
        if(this.state.warning)
        {
            return(<p id="warning"> Please type in a unique item to add it to the To-Do list!</p>)
        }
        else
        {
            return(<p></p>)
        }
    }

    //In this render we create our form for when a user wants to add a new task and 
    //we set up our table and call the TableItem component to fill the table with our components and data
    render()
    {
        return(
            <div className="dataCenter">
                <form className="table" onSubmit={this.handleSubmit}>
                    <input value={this.state.term} onChange={this.onChange}/>
                    {
                        this.showWarning()
                    }
                    <button>Submit</button>
                </form>
                <div className="tableDiv">
                    <table className="table-bordered table-hover">
                        <tbody>
                            {
                                this.state.tasks.map((currentTask) =>
                                <tr key={currentTask.id}>
                                    <td>
                                        <input type="checkbox" checked={currentTask.isDone} className = "checkbox" onChange={() => this.checkTask(currentTask)} />
                                        <TableItem task={currentTask} />
                                        <button className="delete" onClick={()=> this.deleteTask(currentTask)}> Delete Item </button>
                                    </td>
                                </tr>
                                )
                            }
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
    mutation updateDone($id: String!, $isDone: Boolean!) {
        updateDone(id: $id, isDone: $isDone){
            id
            item
            isDone
        }
    }`;

//In our export statement we compose a list of the graphql quieries/mutations that we use and also export
//the task component itself
export default compose(graphql(deleteItem,{name: 'removeItem'}),
graphql(taskQuery,{name: 'getTasks'}),
graphql(ADD_TODO,{name: 'addItem'}),graphql(markCompletedQuery,{name: 'updateDone'}))(Tasks);