import React from 'react';
import PropTypes from 'prop-types';

const ContactComponent = ({ identity, contact, createModal }) => {
    return (
        <div className="Contact" onClick={createModal}>
            <i className="fas fa-user" />
            <p>{contact && contact.name ? contact.name : identity}</p>
        </div>
    );
};

ContactComponent.propTypes = {
    identity: PropTypes.string.isRequired,
    contact: PropTypes.object.isRequired,
    createModal: PropTypes.func.isRequired
};

export default ContactComponent;
