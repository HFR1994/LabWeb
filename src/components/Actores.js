import React, {Component} from 'react';
import '../css/Actores.css';
import Actor from "./Actor";
import Cruz from "../images/remove.png"


class Actores extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.name = props.name;
        this.actores = props.actores;
        this.newly = props.newly;
        this.remove = props.remove;
    }

    render() {
        return(
            <div className={(this.actores.length === 0) ? ["card_holder negative"]:["card_holder"]}>
                <img alt="remove" className="remove_icon" onClick={() => this.remove(this.id)} src={Cruz}/>
                <div className="title_holder">
                    <h3 className="title">{this.name}</h3>
                    <div className="id_value">{this.id}</div>
                </div>
                <div className="container_list">
                    <ul className="actores">
                        {(this.actores.length === 0) ? <p className="empty">Sin Actores</p>
                            :
                            this.actores.map((actor) =>
                                <Actor key={actor.id} {...actor}/>
                            )
                        }
                    </ul>
                </div>
            </div>);
    }
}
export default Actores;
