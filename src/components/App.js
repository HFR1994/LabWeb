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

        axios.get(`http://api.tvmaze.com/shows/94/cast`)
            .then(res => {
                const personas = res.data;

                personas.map((item) =>
                    actores = [
                        ...actores,
                        {
                            id: item.person.id,
                            name: item.person.name,
                            character: item.character.name,
                            photo: item.character.image.original
                        }
                    ]
                );

                let shows = [...this.state.shows, {id: id, name: name, actores: actores}];
                this.setState({shows: shows, msg: "Serie agregada exitosamente" ,counter: this.state.counter + 1});
            });
    }

    removeShows(id){
        const shows = this.state.shows.filter(x => x.id !== id);
        this.setState({shows: shows, msg: "Serie borrada exitosamente", counter: this.state.counter})
    }

    render() {
        const shows  = this.state.shows;
        return (
            <div id="app" >
                <AddActorForm onNewActor = { this.addShows }/>
                {(shows.length === 0) ? <p id="empty">Empieza agregando una serie</p>
                    :
                    shows.map((item) =>
                        <Actores id={item.id} {...item} remove={this.removeShows}/>
                    )
                }
            </div>
        );
    }
}

export default App;