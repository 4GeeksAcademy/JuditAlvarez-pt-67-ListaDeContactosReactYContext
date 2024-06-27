
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/home.css';

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.loadContactsFromLocalStorage();
        actions.fetchContacts();
    }, []);

    useEffect(() => {
        console.log(Array.isArray(store.contacts));
        console.log(store.contacts);  
    }, [store.contacts]);

    const handleEdit = (contact) => {
        actions.setSelectedContact(contact);
        navigate("/details");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Contact List</h1>
                <Link to="/details" className="btn btn-success" onClick={() => actions.clearSelectedContact()}>
                    <i className="fas fa-plus-circle me-2"></i>Add a new contact
                </Link>
            </div>
            <div className="row">
                <div className="col-12">
                    {Array.isArray(store.contacts) && store.contacts?.map(contact => (
                        <div key={contact.id} className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{contact.name}</h5>
                                <p className="card-text">Address: {contact.address}</p>
                                <p className="card-text">Phone: {contact.phone}</p>
                                <p className="card-text">e-mail: {contact.email}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning" onClick={() => handleEdit(contact)}>
                                        <i className="fas fa-pencil-alt me-2"></i>Edit
                                    </button>
                                    <button className="btn btn-danger" onClick={() => actions.deleteContact(contact.id)}>
                                        <i className="fas fa-trash-alt me-2"></i>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
