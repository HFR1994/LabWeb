import React, {Component} from 'react';
import '../css/Persona.css';
import axios from "axios/index";
import moment from "moment";


class Person extends Component {
    constructor(props) {
        super(props);
        this.id=this.props.match.params.id;
        this.serieid=this.props.match.params.serieid;
        const cachedHits = localStorage.getItem("shows");
        if (cachedHits) {
            const serie = JSON.parse(cachedHits).filter(x => x.id === this.serieid);
            if(serie.length === 0){
                axios.get("http://api.tvmaze.com/shows/"+this.serieid)
                    .then(res => {
                        const data=res.data;
                        this.setState({show:data.name});
                    });
            }else{
                this.state={show:serie[0]["name"]}
            }
        }else{
            axios.get("http://api.tvmaze.com/shows/"+this.serieid)
                .then(res => {
                    const data=res.data;
                    this.setState({show:data.name});
                });
        }
    }

    componentWillMount(){
        axios.get("http://api.tvmaze.com/people/"+this.id)
            .then(res => {
                const persona = res.data;

                let show = [];

                axios.get("http://api.tvmaze.com/people/"+this.id+"/castcredits?embed=show")
                    .then(response => {
                        const aperance = response.data;
                        aperance.map((item) =>
                            show = [
                                ...show,
                                {
                                    id: item._embedded.show.id,
                                    name: item._embedded.show.name,
                                    year: (item._embedded.show.premiered !== null) ? moment(item._embedded.show.premiered,"YYYY-MM-DD").format("YYYY"):"N/A"
                                }
                            ]
                        );
                        this.setState({shows:show});
                    });
                this.setState({name:persona.name, gender:persona.gender, birthday: persona.birthday, country: persona.country.name, photo: persona.image.medium});
            });
    }

    render() {
        const nombre=this.state.name;
        const gender=this.state.gender;
        const birthday = this.state.birthday;
        const shows=(this.state.shows === undefined) ? false:this.state.shows ;
        const show=this.state.show;
        const photo=this.state.photo;
        const country=this.state.country;

        return(
            <div id="app-large">
                <div id="breadcrumbs_container">
                    <a id="return" onClick={() => this.props.history.push("/serie/"+this.serieid)}>REGRESAR</a>
                    <h1 id="title_value">{nombre}/{show}</h1>
                </div>
                <div id={"containers_holder"}>
                    <div id="profile_container" className={"containers"}>
                        <img alt={nombre} className="actor_image actor_element" src={photo}/>
                        <div className="actor_container">
                            <h4 className="actor_name actor_element">{nombre}</h4>
                            <p className="actor_gender actor_element">{gender}</p>
                            <p className="actor_birthday actor_element">{birthday}</p>
                            <p className="actor_country actor_element">{country}</p>
                        </div>
                    </div>
                    <div id="series_container" className={"containers"}>
                        <h2>Series</h2>
                        <ul>
                            {(!shows) ?
                                <li id="no_serie">No hay ninguna serie relacionadas</li>
                                :
                                shows.map((item) =>
                                    <li key={item.id}>{item.year} - {item.name}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Person;

