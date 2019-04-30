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

          "card": [{
            "number": 1,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }, {
            "number": 2,
            "title": "In my head",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          },
          {
            "number": 3,
            "title": "In your mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }]
        },
        {
          "list-name": "To-Do",

          "card": [{
            "number": 1,
            "title": "In my head",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }, {
            "number": 2,
            "title": "In your head",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          },
          {
            "number": 3,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }]
        },
        {
          "list-name": "Doing",
          "card": [{
            "number": 1,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }]
        },
        {
          "list-name": "Done",
          "card": [{
            "number": 1,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }, {
            "number": 2,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          },
          {
            "number": 3,
            "title": "In my mind",
            "date": "30/18/97",
            "description": "In my mind, in my head, this is where we all came from, The dreams we have, the love we share, this is what we waiting for"
          }]
        },
      ]
    }
  }

  addTask = () => {
    
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
                  <input placeholder="Task title" className="inp-title" type="text" />
                  <textarea rows="3" placeholder="description" className="inp-description"></textarea>
                </div>
              </div>
              <div className="modal-btns">
                <button>cancel</button>
                <button className="done-btn">done</button>
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
              <TaskList addTask={this.addTask} key={k} title={each["list-name"]} card={each.card} />
            )
          })}
        </div>
      </div>
    )
  }
}