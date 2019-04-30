import React from 'react';
import './App.css';
import Header from "./components/Header/index.jsx"
import DashBoard from  "./components/Dashboard/index.jsx"

function App() {
  return (
    <div className="App">
      <Header/>
      <DashBoard/>
    </div>  
  );
}

export default App;
