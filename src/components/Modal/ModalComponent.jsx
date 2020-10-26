import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalComponent = ({ show, close, title, children }) => {
    return (
        show && (
            <div className="modal overlay" onClick={close}>
                <div
                    className="card content"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={close}
                        className="right icon-btn delete"
                    />
                    <h2>{title}</h2>
                    <div className="text">{children}</div>
                </div>
            </div>
        )
    );
};

ModalComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.node
};

export default ModalComponent;
