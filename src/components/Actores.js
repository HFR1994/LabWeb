import React from 'react';
import '../css/Actores.css';
import Actor from "./Actor";
import Cruz from "../images/remove.png"

const Actores = ({ id, name, actores=[], remove= f => f} ) =>

    <div className="card_holder">
        <img alt="remove" className="remove_icon" onClick={() => remove(id)} src={Cruz}/>
        <div className="title_holder">
            <h3 className="title">{name}</h3>
            <div className="id_value">{id}</div>
        </div>
        <div className="container_list">
            <ul className="actores">
                {(actores.length === 0) ? <p id="empty">Agrega un Actor</p>
                    :
                    actores.map((actor) =>
                        <Actor key={actor.id} {...actor}/>
                    )
                }
            </ul>
        </div>
    </div>;

export default Actores;
