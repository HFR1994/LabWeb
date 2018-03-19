import React, { Component } from 'react';
import Actores from './Actores.js'
import AddActorForm from './AddActorForm.js'
import "../css/App.css"
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: {},
            counter:0
        };
        this.addSerie = this.addSerie.bind(this);
        this.removeShows = this.removeShows.bind(this);
    }

    addSerie(id, name) {

        let actores = [];
        let check;

        axios.get(`http://api.tvmaze.com/shows/94/cast`)
            .then(res => {
                const personas = res.data;
                {(personas.length === 0) ? check=false
                    :
                    check=true;
                    personas.map((item) =>
                        actores = [
                            ...actores,
                            { id: item.person.id, name: item.person.name, character: item.character.name, photo: item.character.image.original }
                        ]
                    )
                }
                let { shows }=this.state.shows;

                if(check){
                    shows[this.state.counter]={id:id, name:name, actores: actores};
                    this.setState({ shows: shows, counter: this.state.counter+1 });
                }else{
                    this.setState({ shows: shows, msg: 'Serie agregada correctamente', counter: this.state.counter+1 });
                }

        });
    }

    removeShows(id){
        const actors = this.state.actors.filter(x => x.id !== id);
        this.setState({actors})
    }

    render() {
        const { shows } = this.state.shows;
        return (
            <div id="app" >
                <AddActorForm onNewActor = { this.addSerie }/>
                {(shows === undefined) ? <p id="empty">Empieza agregando una serie</p>
                    :
                    shows.map((show) =>
                        <Actores key={show.id} name = {show.name} actors = {show.actores} remove={this.removeShows}/>
                    )
                }
            </div> )
    }
}

export default App;