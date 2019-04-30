import React from "react";
import TaskList from "../commons/card"
import "./style.css"

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      description: "",
      title: "",
      listidx: null,
      cardidx: null,
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
          "card": []
        },
        {
          "list-name": "Done",
          "card": []
        },
      ]
    }
  }

  addTask = async (e) => {
    let idx = await this.state.listidx;
    let data = {
      "title": this.state.title,
      "date": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      "description": this.state.description
    }
    let payload = await this.state.payload;
    payload[idx].card.push(data);
    this.setState({
      payload,
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

  editTask = async () => {
    let data = await this.state.payload;
    data[this.state.listidx].card[this.state.cardidx].title = this.state.title;
    data[this.state.listidx].card[this.state.cardidx].description = this.state.description;

    this.setState({
      payload: data,
      showModal: false
    })
  }

  showModal = (listidx, taskidx) => {
    if(isNaN(taskidx)){
      this.setState({
        title: "",
        description: "",
        showModal: true,
        listidx: listidx,
        istaskEdit : false,
      })
    } else {
      this.setState({
        title: this.state.payload[listidx].card[taskidx].title,
        description: this.state.payload[listidx].card[taskidx].description,
        showModal: true,
        listidx : listidx,
        cardidx: taskidx,
        istaskEdit : true,
      })
    }

  }


  render() {
    return (
      <div className="container">
        {(this.state.showModal) ?
          <div>
            <div className="modal"></div>
            <div className="modal-container">
              <div className="modal-header">Task</div>
              <div>
                <div className="modal-inputs">
                  <input onChange={(e) => { this.setState({ title: e.target.value }) }} placeholder="Task title" className="inp-title" type="text" value={this.state.title} />
                  <textarea onChange={(e) => { this.setState({ description: e.target.value }) }} rows="3" placeholder="description" className="inp-description" value={this.state.description}></textarea>
                </div>
              </div>
              <div className="modal-btns">
                <button onClick={() => { this.setState({ showModal: false }) }} >cancel</button>
                <button onClick={ this.state.istaskEdit ? this.editTask : this.addTask} className="done-btn">done</button>
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
              <TaskList editTask={this.showModal.bind(this.idx, k)} deleteTask={this.deleteTask.bind(this.idx, k)} addTask={this.showModal.bind(this, k)} key={k} title={each["list-name"]} card={each.card} />
            )
          })}
        </div>
      </div>
    )
  }
}