import React, { Component } from 'react';
import "../css/App.css"
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Serie from "./Serie"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Route exact path="/" component={Home} />
                    <Route path="/serie/:id" component={Serie}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;