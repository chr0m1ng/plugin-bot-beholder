import React from 'react';
import PropTypes from 'prop-types';

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
                    <i
                        className="fas fa-times right icon-btn delete"
                        onClick={close}
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
