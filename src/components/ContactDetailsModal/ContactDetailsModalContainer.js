import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getVariableAsync, getContextAsync } from 'services/context-service';
import { tryParseJsonObj } from 'helpers/object-helpers';
import ContactDetailsModal from './ContactDetailsModal';

const ContactDetailsModalContainer = ({ show, closeModal, contact }) => {
    const [context, setContext] = useState([]);
    const [variable, setVariable] = useState(null);
    const [json_variable, setJsonVariable] = useState(null);
    const [contact_name, setContactName] = useState('Usuário');

    useEffect(() => {
        (async () => {
            setContext(await getContextAsync(contact.identity));
            if (contact.name) {
                setContactName(contact.name);
            }
        })();
    }, [contact.identity, contact.name]);

    const getVariableValueAsync = async (key) => {
        const value = await getVariableAsync(contact.identity, key);
        setVariable({ key, value });
        setJsonVariable(tryParseJsonObj(value));
    };

    return (
        <ContactDetailsModal
            show={show}
            closeModal={closeModal}
            contact={contact}
            context={context}
            json_variable={json_variable}
            variable={variable}
            getVariableValue={getVariableValueAsync}
            contact_name={contact_name}
        />
    );
};

ContactDetailsModalContainer.propTypes = {
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
};

export default ContactDetailsModalContainer;
