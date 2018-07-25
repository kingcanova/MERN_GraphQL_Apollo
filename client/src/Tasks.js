import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Item from './Item';
import {graphql, compose} from 'react-apollo';

class Tasks extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            term: '',
            error: null,
            tasks: this.props.data
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeText = this.changeText.bind(this);
        //console.log(this.state.tasks);
        
    }

    handleSubmit(e) 
    {
        e.preventDefault();
        if(this.state.term.replace(/^\s+/g, '').length < 1)
        {
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
            var warning = document.getElementById('warning');
            warning.style.visibility = "hidden";

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
    onChange = (event) => 
    {
        this.setState({term: event.target.value});
    }

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
            }
        });
    }

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
        //console.log(this.state.tasks);
        
    }

    render()
    {
        //console.log("GOT HERE", this.state.tasks);
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


export default compose(graphql(deleteItem,{name: 'removeItem'}),
graphql(taskQuery,{name: 'getTasks'}),
graphql(ADD_TODO,{name: 'addItem'}),graphql(markCompletedQuery,{name: 'updateItem'}))(Tasks);
