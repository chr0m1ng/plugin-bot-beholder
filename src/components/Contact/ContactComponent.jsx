import React from 'react';
import PropTypes from 'prop-types';
import ContactModal from 'components/ContactModal';

const ContactComponent = ({
    identity,
    contact,
    createModal,
    show_contact_modal,
    destroyModal
}) => {
    return (
        <div>
            <div className="Contact" onClick={createModal}>
                <i className="fas fa-user" />
                <p>{contact && contact.name ? contact.name : identity}</p>
            </div>
            {show_contact_modal && (
                <ContactModal
                    show={show_contact_modal}
                    closeModal={destroyModal}
                    contact={contact}
                />
            )}
        </div>
    );
};

ContactComponent.propTypes = {
    identity: PropTypes.string.isRequired,
    contact: PropTypes.object.isRequired,
    createModal: PropTypes.func.isRequired,
    show_contact_modal: PropTypes.bool.isRequired,
    destroyModal: PropTypes.func.isRequired
};

export default ContactComponent;
