import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Tasks from './Tasks';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      term: '',
      error: null,
      data: []
    };
  }


  onSubmit = (event) => 
  {
    event.preventDefault();
    if(this.state.term.replace(/^\s+/g, '').length < 1)
    {
      var warning = document.getElementById('warning');
      warning.style.visibility = "visible";
      this.setState(
      {
        term: ''
      });
            
    }
    else
    {
      var warning = document.getElementById('warning');
      warning.style.visibility = "hidden";
    }
  }



  onChange = (event) => 
  {
    this.setState({term: event.target.value});
  }



  render() 
  {
    return(
      <ApolloProvider client={client}>
        <div className="App">
          <h1>To-Do List: </h1>
          <form className="table" onSubmit={this.onSubmit}>
            <input value={this.state.term} onChange={this.onChange}/>
            <p id="warning"> Please type in a unique item to add it to the To-Do list!</p>
            <button>Submit</button>
          </form>
          <table className="table-bordered table-hover">
            <Tasks />
          </table>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
