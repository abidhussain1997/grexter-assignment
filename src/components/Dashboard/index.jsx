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

  deleteTask = () => {
    let data = this.state.payload;
    data[this.state.listidx].card.splice(this.state.cardidx, 1);
    this.setState({
      payload: data,
      showConfirmation: false,
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

  showModal = (listidx, cardidx) => {
    if (isNaN(cardidx)) {
      this.setState({
        title: "",
        description: "",
        showModal: true,
        listidx: listidx,
        istaskEdit: false,
      })
    } else {
      this.setState({
        title: this.state.payload[listidx].card[cardidx].title,
        description: this.state.payload[listidx].card[cardidx].description,
        showModal: true,
        listidx: listidx,
        cardidx: cardidx,
        istaskEdit: true,
      })
    }

  }

  showConfirmation = (listidx, cardidx) => {
    this.setState({
      cardidx,
      listidx,
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
            showModal={ () => {this.setState({showModal : false})}}  istaskEdit={this.state.istaskEdit} title={this.state.title} description={this.state.description} />
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