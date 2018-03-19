import React, {Component} from 'react';
import '../css/App.css';
import axios from "axios/index";
import AddActorForm from "./AddActorForm";
import Actores from "./Actores";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shows: [],
            counter: 0
        };
        this.addShows = this.addShows.bind(this);
        this.removeShows = this.removeShows.bind(this);
    }

    componentWillMount(){
        const cachedHits = localStorage.getItem("shows");
        if (cachedHits) {
            const
                json = JSON.parse(cachedHits);
            this.setState({ shows: json, counter: json.length+1 });
        }
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

                const item=[...this.state.shows,{id: id, name: name, actores: actores}];
                localStorage.setItem("shows", JSON.stringify(item));
                this.setState({shows: item, msg: "Serie agregada correctamente" ,counter: this.state.counter + 1});
            }).catch(() => {
            let shows = [...this.state.shows, {id: id, name: name, actores: []}];
            this.setState({shows: shows, msg: "Serie agregada correctamente" ,counter: this.state.counter + 1});
        });
    }

    removeShows(id){
        const shows = this.state.shows.filter(x => x.id !== id);
        localStorage.setItem("shows", JSON.stringify(shows));
        this.setState({shows: shows, msg: "Serie borrada correctamente", counter: this.state.counter})
    }

    render() {

        const shows  = this.state.shows;
        const msg = this.state.msg;

        return (
            <div id="app">
                <AddActorForm onNewActor={this.addShows}/>
                <div className="title_container">
                    <h1 id="contain_banner">Mis series</h1>
                    {(msg === undefined) ? "" : <div id="message">{msg}</div>}
                </div>
                <div id="contain_cards">
                    {(shows.length === 0) ? <p id="empty">Empieza agregando una serie</p>
                        :
                        shows.map((item) =>
                            <Actores key={item.id} {...item} link={false} remove={this.removeShows} history={this.props.history}/>
                        )
                    }
                </div>
            </div>
        );
    };
}

export default Home;