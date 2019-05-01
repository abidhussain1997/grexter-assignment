import React from "react";
import "./style.css";
export default (props) => (
  <div className="confirm">
    <div className="addFilter"></div>
    <div className="confirmBox">
      <div style={{ margin: "8px" }}>
        <div className="confirm-title">Are you sure ?</div>
        <div onClick={props.deleteTask} className="confirm-del confirm-option">Yes</div>
        <div onClick={props.hideAlert} className="confirm-cancel confirm-option">No</div>
      </div>
    </div>
  </div>
)