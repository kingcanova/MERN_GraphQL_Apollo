import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, Mutation, compose } from 'react-apollo';
import { storeKeyNameFromField } from 'apollo-utilities';


class Item extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tasks: this.props.tasks
        };
        this.deleteTask.bind(this.props.deleteTask);
        this.checkTask.bind(this.props.checkTask);
        this.changeText.bind(this.props.changeText);
    }


    checkTask(task)
    {
        this.props.checkTask(task);
    }

    editButton(task)
    {
        var curElement = document.getElementById(task.id);
        var newText = curElement.innerText;
        var _this = this;
        curElement.contentEditable = "true";
        curElement.focus();
        curElement.addEventListener('keypress', function(e)
        {
            var key = e.which || e.keyCode;
            if(key === 13)
            {
                e.target.contentEditable = "false";
                e.target.blur();
                newText = e.target.innerText;
                _this.changeText(task, newText);
            }
        });
        curElement.addEventListener('blur', function(e)
        {
            e.target.contentEditable = "false";
            newText = e.target.innerText;
            _this.changeText(task,newText);
            
        });
    }
    changeText(task,newText)
    {
        this.props.changeText(task,newText)
    }

    deleteTask(task)
    {
        this.props.deleteTask(task);
    }

    render()
    {
        //console.log("items", this.state.tasks);
        return(
            this.props.tasks.map((currentTask)=>
                <tr key={currentTask.id}>
                    <td>
                        <input type="checkbox" checked={currentTask.isDone} className = "checkbox" onChange={() => this.checkTask(currentTask)} />
                        <p id={currentTask.id}>{currentTask.item}</p>
                        <button onClick={()=> this.deleteTask(currentTask)}> Delete Item </button>
                        <button onClick={()=> this.editButton(currentTask)}> Edit Item</button>
                    </td>
                </tr>
            )
        );
    }
}


export default Item;