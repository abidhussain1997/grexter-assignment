import React from "react";
import TaskList from "../commons/card";
import "./style.css";
import  Modal from  "../commons/modal";
import  AlertBox from  "../commons/alert";


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showConfirmation: false,
      description: "",
      title: "",
      listIdx: null,
      cardIdx: null,
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

  componentWillMount = () => {
    // Populate states from localstorage
    let payload = JSON.parse(localStorage.getItem("payload"));
    if(payload != null){
      this.setState({
        payload
      })
    }
  }

  // Method to add new task in a list
  addTask = async (e) => {
    let idx = await this.state.listIdx;
    let data = {
      "title": this.state.title,
      "date": new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
      "description": this.state.description
    }
    let payload = await this.state.payload;
    payload[idx].card.push(data);
    await this.setState({
      payload,
      showModal: false
    })

    localStorage.setItem("payload", JSON.stringify(this.state.payload))
  }
 
  // Method to delete a task from the list 
  deleteTask = async () => {
    let data = this.state.payload;
    data[this.state.listIdx].card.splice(this.state.cardIdx, 1);
    await this.setState({
      payload: data,
      showConfirmation: false,
    })
    localStorage.setItem("payload", JSON.stringify(this.state.payload))
  }

  // Method to edit a task
  editTask = async () => {
    let data = await this.state.payload;
    data[this.state.listIdx].card[this.state.cardIdx].title = this.state.title;
    data[this.state.listIdx].card[this.state.cardIdx].description = this.state.description;

    await this.setState({
      payload: data,
      showModal: false
    })
    localStorage.setItem("payload", JSON.stringify(this.state.payload))
  }

  // show Add/Edit Modal
  showModal = (listIdx, cardIdx) => {
    // Open Modal to Add Task
    if (isNaN(cardIdx)) {
      this.setState({
        title: "",
        description: "",
        showModal: true,
        listIdx: listIdx,
        istaskEdit: false,
      })
    } else {
      // Open modal to edit task 
      this.setState({
        title: this.state.payload[listIdx].card[cardIdx].title,
        description: this.state.payload[listIdx].card[cardIdx].description,
        showModal: true,
        listIdx: listIdx,
        cardIdx: cardIdx,
        istaskEdit: true,
      })
    }

  }

  // Show alert box on delete task
  showConfirmation = (listIdx, cardIdx) => {
    this.setState({
      cardIdx,
      listIdx,
      showConfirmation: true,
    })
  }


  render() {
    return (
      <div className="container">
        {this.state.showConfirmation ?
          <AlertBox deleteTask={this.deleteTask} hideAlert={ () => {this.setState({ showConfirmation: false }) }}/>
          :
          null
        }

        {(this.state.showModal) ?
          <Modal addTask={this.addTask} editTask={this.editTask} 
            onChangeDescription={(e) => this.setState({ description: e.target.value })} onChangeTitle={(e) => this.setState({ title: e.target.value })} 
            hideModal={ () => {this.setState({showModal : false})}}  istaskEdit={this.state.istaskEdit} title={this.state.title} description={this.state.description} />
          :
          null
        }

        <div className="board-title">Weekly Planner</div>
        <div className="board">
          {this.state.payload.map((each, k) => {
            return (
              <TaskList editTask={this.showModal.bind(this.idx, k)} deleteTask={this.showConfirmation.bind(this.idx, k)} addTask={this.showModal.bind(this, k)} key={k} title={each["list-name"]} card={each.card} />
            )
          })}
        </div>

      </div>
    )
  }
}