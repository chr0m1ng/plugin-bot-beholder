import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import Modal from 'components/Modal';

const StateDetailsComponent = (data, show, closeModal) => {
    return (
        <Modal
            show={show}
            title={data.extension_data ? data.extension_data.name : 'Detalhes'}
            close={closeModal}
        >
            <ReactJson
                src={data}
                displayDataTypes={false}
                name={'state'}
                sortKeys={false}
            />
        </Modal>
    );
};

StateDetailsComponent.propTypes = {
    data: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default StateDetailsComponent;
