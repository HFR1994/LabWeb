import React from 'react';
const AddActorForm = ({ onNewActor = f => f}) => {
    let _id, _name;

    const submit = e => {
        e.preventDefault();
        onNewActor(_id.value, _name.value);
        _id.value='';
        _name.value = '';
        _name.focus();
    };

    return (
        <form id="horizontal-form" onSubmit ={submit} >
            <h2 id="add_actor_text">Agregar Serie</h2>
            <input className="form-control" id="first_form" ref={input => _name = input} type="text" placeholder="Nombre de la serie" required />
            <input className="form-control" ref={input => _id = input} type="text" placeholder="Id de la serie" required />
            <button id="add_item"> Agregar </ button>
        </form> );
};

export default AddActorForm