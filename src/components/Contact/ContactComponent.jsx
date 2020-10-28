import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ContactDetailsModal from 'components/ContactDetailsModal';

const ContactComponent = ({
    identity,
    contact,
    createModal,
    show_contact_modal,
    destroyModal
}) => {
    return (
        <div>
            <div className="contact" onClick={createModal}>
                <p>
                    <FontAwesomeIcon icon={faUser} />{' '}
                    {contact && contact.name ? contact.name : identity}
                </p>
            </div>
            {show_contact_modal && (
                <ContactDetailsModal
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
