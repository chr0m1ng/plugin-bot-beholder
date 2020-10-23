import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getContactAsync } from 'services/contact-service';
import { withLoading } from 'services/common-service';
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
        <ContactComponent
            identity={identity}
            contact={contact}
            createModal={createModal}
            show_contact_modal={show_contact_modal}
            destroyModal={destroyModal}
        />
    );
};

ContactContainer.propTypes = {
    identity: PropTypes.string.isRequired
};

export default ContactContainer;
