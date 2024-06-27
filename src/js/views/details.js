import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/details.css';

export const Details = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (store.selectedContact) {
            setContact(store.selectedContact);
        }
    }, [store.selectedContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (store.selectedContact) {
            actions.updateContact(contact);
        } else {
            actions.addContact(contact);
        }
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h1>{store.selectedContact ? "Edit Contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={contact.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={contact.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-control" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={contact.address} onChange={handleChange} required />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        <i className="fas fa-save me-2"></i>{store.selectedContact ? "Update contact" : "Save contact"}
                    </button>
                    <Link to="/" className="btn btn-secondary ms-2">
                        <i className="fas fa-arrow-left me-2"></i>Return to list of contacts
                    </Link>
                </div>
            </form>
        </div>
    );
};
