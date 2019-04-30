import React from "react";
import "./styles.css"

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
        <button className="edit-btn opt-btn">Edit</button>
        <button className="delete-btn opt-btn">delete</button>
      </div>
    </div>
  );
}

export default (props) => (
  <div className="task-list-header">{props.title}
    <div className="task-list">
      {props.card.map((each, k) => {
        return (
          <Card key={k} number={each.number} title={each.title} date={each.date} description={each.description} />
        )
      })}
    </div>
    <div onClick={props.addTask} className="task-add">
      Add Task
    </div>
  </div>
)

