import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
// import Home from "./component/home";
import About from "./component/about";
import Contact from "./component/contact";

import Home from "./component/home";
// import About from "./component/about";
// import Contact from "./component/contact";
import Login from "./component/Login";
import Ticket from "./component/Ticket";
import DetailTicket from "./component/DetailTicket";
import Header from "./component/Header";

import TicketList from "./component/ticketList";
import "./App.css";
import "./css/style.css"
 
class App extends Component {
  constructor() {
    super();
    this.state = {favoritecolor: "red"}

    
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({favoritecolor: "yellow"})
    }, 1000)
  }
    render() {
        return (
            <Router>
              <p>{this.state.favoritecolor}</p>
              <Routes>
                  <Route
                      exact
                      path="/"
                      element={<Home />}
                  ></Route>
                  <Route
                      exact
                      path="/about"
                      element={<About />}
                  ></Route>
                  <Route
                      exact
                      path="/contact"
                      element={<Contact />}
                  ></Route>

                  <Route
                      exact
                      path="/TicketList"
                      element={<TicketList />}
                  ></Route>


              </Routes>
            </Router>
        );
    }
}
 
export default App;