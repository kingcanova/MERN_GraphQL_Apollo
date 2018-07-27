import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

//This client object sets up our apolloclient with a connection to our backend graphql server configuration
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
    }),
    cache: new InMemoryCache()
});
//Here we create our acutal application, wrapping it in an apolloprovider to be able to use our graphql implementation
ReactDOM.render(<ApolloProvider client={client}>
                    <App />
                </ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
