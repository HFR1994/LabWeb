import React from 'react';
import '../css/Actor.css';

const Actor = ({id, name, character, photo, large} ) =>
    <li className={(large) ? ["actor actor-large"]:["actor"]}>
        <img alt={name} className="actor_image actor_element" src={photo} />
        <div className="actor_container">
            <h4 className="actor_name actor_element">{name}</h4>
            <h5 className="actor_character actor_element">{character}</h5>
        </div>
    </li>;

export default Actor;
