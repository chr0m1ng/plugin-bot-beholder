import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import Modal from 'components/Modal';

const ContactDetailsModal = ({
    show,
    closeModal,
    contact,
    context,
    variable,
    json_variable,
    getVariableValue,
    contact_name
}) => {
    return (
        <Modal show={show} title={contact_name} close={closeModal}>
            <div id="contact-modal">
                <div className="keys-area">
                    <div className="contact-area">
                        <h3>
                            Contact{' '}
                            <span role="img" aria-label="Bust in Silhouette">
                                👤
                            </span>
                        </h3>
                        <ReactJson
                            src={contact}
                            displayDataTypes={false}
                            name="contact"
                            sortKeys={false}
                        />
                    </div>
                    <div className="context-list-area">
                        {context.length > 0 && (
                            <h3>
                                Contexts{' '}
                                <span role="img" aria-label="Books">
                                    📚
                                </span>
                            </h3>
                        )}
                        <ul className="context-list">
                            {context.map((key) => (
                                <li
                                    className="clickable context-list-item"
                                    key={key}
                                    onClick={() => getVariableValue(key)}
                                >
                                    <span role="img" aria-label="magnifier">
                                        🔎
                                    </span>
                                    {` ${key}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="context-value-area">
                    {variable && (
                        <div>
                            <hr />
                            <strong>{variable.key}: </strong> {variable.value}
                            {json_variable && (
                                <div className="context-value-json-area">
                                    <ReactJson
                                        src={json_variable}
                                        displayDataTypes={false}
                                        name={variable.key}
                                        sortKeys={false}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

ContactDetailsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    contact: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    context: PropTypes.arrayOf(PropTypes.string).isRequired,
    variable: PropTypes.object,
    json_variable: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    getVariableValue: PropTypes.func.isRequired,
    contact_name: PropTypes.string.isRequired
};

export default ContactDetailsModal;
