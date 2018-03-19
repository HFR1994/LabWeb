import React, {Component} from 'react';
import '../css/Actor.css';

class Actor extends Component {

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.name = this.props.name;
        this.character = this.props.character;
        this.photo = this.props.photo;
        this.large = this.props.large;
        this.serie = this.props.serie;
    }

    render() {
        return(
            <li className={(this.large) ? ["actor actor-large"] : ["actor"]}>
                <img alt={this.name} className="actor_image actor_element" src={this.photo}/>
                <div className="actor_container">
                    {(this.large) ?
                        <a className={"hover"} onClick={() => this.props.history.push("/serie/" + this.serie + "/actor/" + this.id)}><h4 className="actor_name actor_element">{this.name}</h4></a>
                        :
                        <h4 className="actor_name actor_element">{this.name}</h4>
                    }
                    <h5 className="actor_character actor_element">{this.character}</h5>
                </div>
            </li>
        );
    }
}

export default Actor;
