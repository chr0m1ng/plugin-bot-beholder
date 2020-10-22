import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getVariableAsync, getContextAsync } from 'services/context-service';
import { withLoading } from 'services/common-service';
import { tryParseJsonObj } from 'helpers/object-helpers';
import ContactModal from './ContactModal';

const ContactModalContainer = ({ show, closeModal, contact }) => {
    const [context, setContext] = useState([]);
    const [variable, setVariable] = useState(null);
    const [json_variable, setJsonVariable] = useState(null);
    const [contact_name, setContactName] = useState('Usuário');

    useEffect(() => {
        withLoading(async () => {
            setContext(await getContextAsync(contact.identity));
            if (contact.name) {
                setContactName(contact.name);
            }
        });
    }, [contact.identity, contact.name]);

    const getVariableValueAsync = async (key) => {
        const value = await getVariableAsync(contact.identity, key);
        setVariable({ key, value });
        setJsonVariable(tryParseJsonObj(value));
    };

    return (
        <ContactModal
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

ContactModalContainer.propTypes = {
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired
};

export default ContactModalContainer;
