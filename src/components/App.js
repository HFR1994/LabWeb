import React, { Component } from 'react';
import "../css/App.css"
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Serie from "./Serie"
import Person from "./Person";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/serie/:id" component={Serie}/>
                    <Route exact path="/serie/:serieid/actor/:id" component={Person}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;