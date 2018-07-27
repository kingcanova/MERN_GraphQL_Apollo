import React, { Component } from 'react';
import './App.css';
import Tasks from './Tasks';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

//First point of entry to react components, this is called from index.js in the client/src/ folder
class App extends Component 
{
  //Set up our super props and make our current state equal to nothing
  constructor(props)
  {
    super(props);
    this.state = {};
  }
  //after the constructor render is called, this is what creates the DOM elements and calls the other react components
  render() 
  {
    //The const loading statement is a call to the taskQuery below which quieries graphql for all of the tasks,
    //if loading is true it means we do not yet have all of our data and therefore should not return the rest of the
    //DOM elements or react components
    const loading = this.props.getTasks.loading;
    if(loading)
    {
      return <div> loading </div>;
    }
    //In this return statement we create a div, an h1 task and call the Tasks react component with data retrieved
    //from the graphql queiry below
    return(
        <div className="App">
          <h1>To-Do List: </h1>
          <Tasks data={this.props.getTasks.tasks}/>
        </div>
    );
  }
}

//This is the apollo-react-graphql call which when used returns all of the items in the tasks collection from
//the mongodb database
const taskQuery = gql`
  query todoList {
    tasks {
      id
      item
      isDone
    }
  }`;
//At the bottom I export the graphql quiery and the App component itself
export default graphql(taskQuery,{name: 'getTasks'})(App);
