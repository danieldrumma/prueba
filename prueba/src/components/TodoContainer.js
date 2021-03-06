import React from "react"
import NoteRepository from "./NoteRepository"
import Header from "./Header"
import InputTodo from "./InputTodo"


class TodoContainer extends React.Component {
    state = {
        todos: [
          {
            id: 1,
            title: "Setup development environment",
            completed: true,
            tag: "school"
          },
          {
            id: 2,
            title: "Develop website and add content",
            completed: false,
            tag: "school"
          },
          {
            id: 3,
            title: "Deploy to live server",
            completed: false,
            tag: "school"
          }
        ]
       };

    createID = () => {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const uniqid = randLetter + Date.now();
        return uniqid;
    }

    //handle check box behavior
    handleChange = (id) => {
        console.log("clicked", id);
        this.setState({
            todos: this.state.todos.map( todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };

    // delete at upper level
    // use filter - returns only values that are not equal to passed in value
    delTodo = (id) => {
        console.log("deleted", id);
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                }
                )
            ]
        })
    };

    //add new todo item
    addTodoItem = (title, tag) => {
        const newTodo = {
            id: this.createID(), 
            title: title,
            completed: false,
            tag: tag
        };
        this.setState({
            todos: [newTodo, ...this.state.todos]
        })
    }

    render() {
        return (
            <div className="container">
                <Header />
                <InputTodo addTodoProps = {this.addTodoItem}/>
                <NoteRepository 
                todos={this.state.todos} 
                handleChangeProps={this.handleChange}
                deleteTodoProps={this.delTodo}
                />
            </div>
        )
    }
};


export default TodoContainer