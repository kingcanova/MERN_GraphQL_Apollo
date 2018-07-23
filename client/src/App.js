import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Mutation } from 'react-apollo';
import Tasks from './Tasks';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      term: '',
      error: null,
      data: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
      //THIS IS WHERE YOU WERE LAST TRYING TO GET THE ADDITEM MUTATION WORKING 
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
          const data = store.readQuery({query: taskQuery});

          data.tasks.push(addItem);

          store.writeQuery({query: taskQuery, data});
        }
      }).then(function getResponse(response){
        console.log(response);
      });
      this.setState(
      {
        term: ''
      });
    }
  }

  onChange = (event) => 
  {
    this.setState({term: event.target.value});
  }



  render() 
  {
    //const loading = this.props.getTasks.loading;
    //if(loading)
    //{
    //  return <div> loading </div>;
    //}
    //console.log(this.props.getTasks.tasks);
    return(
        <div className="App">
          <h1>To-Do List: </h1>
          <form className="table" onSubmit={this.handleSubmit}>
            <input value={this.state.term} onChange={this.onChange}/>
            <p id="warning"> Please type in a unique item to add it to the To-Do list!</p>
            <button>Submit</button>
          </form>
          <div className="tableDiv">
            <table className="table-bordered table-hover">
              <tbody>
                <Tasks />
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

const ADD_TODO = gql`
  mutation addItem($item: String!, $isDone: Boolean!){
    addItem(item: $item, isDone: $isDone){
      id
      item
      isDone
    }
  }
`;

const taskQuery = gql`
  query todoList {
    tasks {
      id
      item
      isDone
    }
  }
  `;

export default compose(graphql(taskQuery,{name: 'getTasks'}),
graphql(ADD_TODO,{name: 'addItem'}))(App);
