import React from 'react';
import '../css/Actores.css';
import Actor from "./Actor";
import Cruz from "../images/remove.png"

const Actores = ({ name, actors=[], remove= f => f} ) =>

    <div className="card_holder">
        <img alt="remove" className="remove_icon" onClick={() => remove(3)} src={Cruz}/>
        <div className="title_holder">
            <h3 className="title">Game of Thrones</h3>
            <div className="id_value">83</div>
        </div>
        <div className="container_list">
            <ul className="actores">
                {(actors.length === 0) ? <p id="empty">Agrega un Actor</p>
                    :
                    actors.map((actor) =>
                        <Actor key={actor.id} {...actor}/>
                    )
                }
            </ul>
        </div>
    </div>;

export default Actores;
