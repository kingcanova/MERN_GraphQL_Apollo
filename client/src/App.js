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
    this.state = {};
  }
  render() 
  {
    const loading = this.props.getTasks.loading;
    if(loading)
    {
      return <div> loading </div>;
    }
    return(
        <div className="App">
          <h1>To-Do List: </h1>
          <Tasks data={this.props.getTasks.tasks}/>
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

export default graphql(taskQuery,{name: 'getTasks'})(App);
