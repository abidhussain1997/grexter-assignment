import React from "react"

export default (props) => (
  <div>
    <div className="addFilter"></div>
    <div className="modal-container">
      <div className="modal-header">{props.istaskEdit ? "Edit Task" : "Add Task"} </div>
      <div>
        <div className="modal-inputs">
          <input onChange={(e) => { props.onChangeTitle(e) }} placeholder="Task title" className="inp-title" type="text" value={props.title} />
          <textarea onChange={(e) => { props.onChangeDescription(e) }} rows="3" placeholder="description" className="inp-description" value={props.description}></textarea>
        </div>
      </div>
      <div className="modal-btns">
        <button onClick={props.showModal}>Cancel</button>
        <button onClick={props.istaskEdit ? props.editTask : props.addTask} className="done-btn">Done</button>
      </div>
    </div>
  </div>
);