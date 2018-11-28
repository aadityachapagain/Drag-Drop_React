import React, { Component } from 'react';
import './App.css';


class App extends Component {
  state = {
    tasks: [
        {name:"Azazal",category:"Male", bgcolor: "yellow"},
        {name:"Chris Hemworth", category:"Male", bgcolor:"red"},
        {name:"Sasy ford", category:"Female", bgcolor:"skyblue"},
        {name:"Jess pinkman", category:"Female",bgcolor:"pink"}
      ]
}

onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
}

onDragOver = (ev) => {
    ev.preventDefault();
}

onDrop = (ev, cat) => {
   let id = ev.dataTransfer.getData("id");
   
   let tasks = this.state.tasks.filter((task) => {
       if (task.name === id) {
           task.category = cat;
       }
       return task;
   });

   this.setState({
       ...this.state,
       tasks
   });
}

render() {
    var tasks = {
        Male: [],
        Female: []
    }

    this.state.tasks.forEach ((t) => {
        tasks[t.category].push(
            <div key={t.name} 
                onDragStart = {(e) => this.onDragStart(e, t.name)}
                draggable
                className="draggable"
                style = {{backgroundColor: t.bgcolor}}
            >
                {t.name}
            </div>
        );
    });

    return (
        <div className="container-drag">
            <h2 className="header">DRAG & DROP DEMO</h2>
            <div className="Male"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "Male")}}>
                <span className="task-header">Male</span> 
                {tasks.Male}
            </div>
            <div className="droppable" 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "Female")}>
                 <span className="task-header">Female</span>
                 {tasks.Female}
            </div>


        </div>
    );
}
}

export default App