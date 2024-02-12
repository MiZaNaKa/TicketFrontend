import React, { Component,setState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Home from "./component/home";
import Login from "./component/Login";
import Ticket from "./component/Ticket";
import DetailTicket from "./component/DetailTicket";
import EditTicket from "./component/EditTicket";

import TicketList from "./component/ticketList";
import PrivateRoute from "./component/auth/PrivateRoute";
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
              
              <Routes>
                  <Route
                      exact
                      path="/"
                      element={<Home />}
                  ></Route>
                 
                  <Route path="Ticket" element={<PrivateRoute Component={Ticket} />} />
                  <Route exact path="TicketList" element={<PrivateRoute Component={TicketList} />} />
                  <Route exact  path="DetailTicket/:id" element={<PrivateRoute Component={DetailTicket} />} />
                  <Route exact  path="EditTicket/:id" element={<PrivateRoute Component={EditTicket} />} />

                  
                  

                    <Route
                      exact
                      path="/Login"
                      element={<Login />}
                  ></Route>


              </Routes>
            </Router>
        );
    }
}
 
export default App;