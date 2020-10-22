import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getContactAsync } from 'services/contact-service';
import { withLoading } from 'services/common-service';
import ContactModal from 'components/ContactModal';
import ContactComponent from './ContactComponent';

const ContactContainer = ({ identity }) => {
    const [contact, setContact] = useState({});
    const [show_contact_modal, setShowContactModal] = useState(false);

    useEffect(() => {
        withLoading(async () => setContact(await getContactAsync(identity)));
    }, [identity]);

    const createModal = () => setShowContactModal(true);

    const destroyModal = () => setShowContactModal(false);

    return (
        <div>
            <ContactComponent
                identity={identity}
                contact={contact}
                createModal={createModal}
            />
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

ContactContainer.propTypes = {
    identity: PropTypes.string.isRequired
};

export default ContactContainer;
