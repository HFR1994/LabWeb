import React, { Component } from 'react';
import Actores from './Actores.js'
import AddActorForm from './AddActorForm.js'
import "../css/App.css"
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            shows: [],
            counter:0
        };
        this.addShows = this.addShows.bind(this);
        this.removeShows = this.removeShows.bind(this);
    }

    addShows(id, name) {

        let actores = [];

        axios.get("http://api.tvmaze.com/shows/"+id+"/cast")
            .then(res => {
                const personas = res.data;

                personas.map((item) =>
                    actores = [
                        ...actores,
                        {
                            id: item.person.id,
                            name: item.person.name,
                            character: item.character.name,
                            photo: (item.character.image === null) ? item.person.image.medium:item.character.image.medium
                        }
                    ]
                );

                let shows = [...this.state.shows, {id: id, name: name, actores: actores}];
                this.setState({shows: shows, msg: "Serie agregada correctamente" ,counter: this.state.counter + 1});
            });
    }

    removeShows(id){
        const shows = this.state.shows.filter(x => x.id !== id);
        this.setState({shows: shows, msg: "Serie borrada correctamente", counter: this.state.counter})
    }

    render() {
        const shows  = this.state.shows;
        const msg = this.state.msg;
        return (
            <div id="app" >
                <AddActorForm onNewActor = { this.addShows }/>
                <div className="title_container">
                    <h1 id="contain_banner">Mis series</h1>
                    {(msg === undefined) ? "":<div id="message">{msg}</div>}
                </div>
                <div id="contain_cards">
                {(shows.length === 0) ? <p id="empty">Empieza agregando una serie</p>
                    :
                    shows.map((item) =>
                        <Actores key={item.id} {...item} remove={this.removeShows}/>
                    )
                }
                </div>
            </div>
        );
    }
}

export default App;