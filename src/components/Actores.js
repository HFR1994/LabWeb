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
        this.state={color:"#fdffe3"};
    }

    render() {
        setTimeout(function(){
            this.setState({color:'#fefefe'});
            setTimeout(function(){
                this.setState({color:'#fdffe3'});
                setTimeout(function(){
                    this.setState({color:'#fefefe'});
                }.bind(this), 500);
            }.bind(this), 500);
        }.bind(this), 500);

        this.setState({color:{
            inputRange: [0, 300],
            outputRange: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)']
        }});

        return(
            <div>
                <div className="card_holder" style={(this.newly) ? {backgroundColor:this.state.color}:{}}>
                    <img alt="remove" className="remove_icon" onClick={() => this.remove(this.id)} src={Cruz}/>
                    <div className="title_holder">
                        <h3 className="title">{this.name}</h3>
                        <div className="id_value">{this.id}</div>
                    </div>
                    <div className="container_list">
                        <ul className="actores">
                            {(this.actores.length === 0) ? <p id="empty">Agrega un Actor</p>
                                :
                                this.actores.map((actor) =>
                                    <Actor key={actor.id} {...actor}/>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>);
    }
}
export default Actores;
