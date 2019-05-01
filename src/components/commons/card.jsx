import React from "react";
import "./style.css";

export const Card = (props) => {
  return (
    <div className="card">
      <div className="card-head-content">
        <span className="card-number"> {props.number} </span>
        <span className="card-title"> {props.title} </span>
        <span className="card-date"> {props.date} </span>
      </div>
      <div className="card-description"> {props.description} </div>
      <div className="card-operations">
        <button onClick={props.editTask} className="edit-btn opt-btn">Edit</button>
        <button onClick={props.deleteTask} className="delete-btn opt-btn">delete</button>
      </div>
    </div>
  );
}

export default (props) => (
  <div className="task-list-header">{props.title}
    <div className="task-list">
      {props.card.map((each, k) => {
        return (
          <Card editTask={props.editTask.bind(this, k)} deleteTask={props.deleteTask.bind(this, k)} key={k} number={k + 1} title={each.title} date={each.date} description={each.description} />
        )
      })}
    </div>
    <div onClick={props.addTask} idx={props.idx} className="task-add">
      Add Task
    </div>
  </div>
)

