import React, {Component} from 'react';
import '../css/App.css';
import '../css/Serie.css'
import axios from "axios/index";
import Actor from "./Actor";

class Serie extends Component {

    constructor(props) {
        super(props);
        this.id=this.props.match.params.id;
        const cachedHits = localStorage.getItem("shows");
        if (cachedHits) {
            const name = JSON.parse(cachedHits).filter(x => x.id === this.id);
            if(name.length === 0){
                this.state={actores:[]};
                axios.get("http://api.tvmaze.com/shows/"+this.id)
                    .then(res => {
                        const data=res.data;
                        this.setState({name:data.name});
                    });
            }else{
                this.state={actores:[], name:name[0]["name"]}
            }
        }else{
            this.state={actores:[]}
        }
    }

    componentWillMount() {

        let actores = [];

        axios.get("http://api.tvmaze.com/shows/"+this.id+"/cast")
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
                this.setState({actores:actores});
            }).catch(error => {console.log(error)});
    }

    render() {

        const actores  = this.state.actores;
        const nombre = this.state.name;

        return (
            <div id="app-large">
                <div id="breadcrumbs_container">
                    <a id="return" onClick={() => this.props.history.push('/')}>REGRESAR</a>
                    <h1 id="title_value">{nombre}</h1>
                </div>
                <ul id="actor_container">
                    {(actores.length === 0) ? <p id="empty">Esa serie no Existe</p>
                        :
                        actores.map((item) =>
                            <Actor history={this.props.history} key={item.id} large={true} serie={this.id} {...item} />
                        )
                    }
                </ul>
            </div>
        );
    };
}

export default Serie;