import React, {Component} from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import Item from './Item';

const Tasks = () => (
    <Query query={gql`
        {
            tasks{
                id
                item
                isDone
            }
        }
    `}
    >
        {({loading,error,data}) =>{
            if(loading) return <p>Loading...</p>;
            if(error) return <p>Error loading data from GraphQl</p>;
            return data.tasks.map((currentTask) => (
                        <Item task={currentTask} />
                    )); 
        }}
    </Query>

);

export default Tasks;