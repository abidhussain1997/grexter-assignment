import React from "react";
import TaskList from "../commons/card"
import "./style.css"

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      payload: [
        {
          "list-name": "All",

          "card": []
        },
        {
          "list-name": "To-Do",

          "card": []
        },
        {
          "list-name": "Doing",
          "card": [{
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }]
        },
        {
          "list-name": "Done",
          "card": []
        },
      ]
    }
  }

  addTask = async (e) => {
    let idx = await this.state.idx;
    let data = {
      "number": this.state.payload[idx].card.length + 1,
      "title": this.state.title,
      "date": new Date().toJSON().slice(0,10).replace(/-/g,'/'),
      "description": this.state.description
    }
    let d = await this.state.payload;
    d[idx].card.push(data);
    this.setState({
      payload : d,
      showModal: false
    })
  }

  deleteTask = (listidx, taskidx) => {
    let data = this.state.payload;
    data[listidx].card.splice(taskidx, 1);
    this.setState({
      payload: data,
    })
  }

  showModal = (idx, e) => {
    this.setState({
      showModal : true,
      idx
    })
  }
  

  render() {
    return (
      <div className="container">
        {(this.state.showModal) ?
          <div>
            <div className="modal"></div>
            <div className="modal-container">
              <div className="modal-header">Add Task</div>
              <div>
                <div className="modal-inputs">
                  <input onChange={(e)=> {this.setState({ title : e.target.value})}} placeholder="Task title" className="inp-title" type="text" />
                  <textarea onChange={(e)=> {this.setState({ description : e.target.value})}} rows="3" placeholder="description" className="inp-description"></textarea>
                </div>
              </div>
              <div className="modal-btns">
                <button onClick={() => { this.setState({showModal: false}) }} >cancel</button>
                <button onClick={this.addTask} className="done-btn">done</button>
              </div>
            </div>
          </div>
          :
          null
        }
        <div className="board-title">Weekly Planner</div>
        <div className="board">
          {this.state.payload.map((each, k) => {
            return (
              <TaskList deleteTask={this.deleteTask.bind(this.idx, k)} addTask={this.showModal.bind(this, k)} key={k} title={each["list-name"]} card={each.card} />
            )
          })}
        </div>
      </div>
    )
  }
}