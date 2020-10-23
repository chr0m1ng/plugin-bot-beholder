import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StateComponent from './StateComponent';

const StateContainer = (data) => {
    const [mouse_x, setMouseX] = useState(0);
    const [mouse_y, setMouseY] = useState(0);
    const [show_state_details, setShowStateDetails] = useState(false);

    const onHover = (e) => {
        const left = `${e.clientX + 20}px`;
        const top = `${e.target.offsetTop + 20}px`;
        setMouseX(left);
        setMouseY(top);
    };

    const createDetailsModal = () => setShowStateDetails(true);

    const detroyDetailsModal = () => setShowStateDetails(false);

    return (
        <StateComponent
            mouse_x={mouse_x}
            mouse_y={mouse_y}
            data={data}
            onHover={onHover}
            show_state_details={show_state_details}
            showDetailsModal={createDetailsModal}
            detroyDetailsModal={detroyDetailsModal}
        />
    );
};

StateContainer.propTypes = {
    data: PropTypes.shape({
        is_error: PropTypes.bool.isRequired,
        timestamp: PropTypes.string.isRequired,
        extension_data: PropTypes.object.isRequired,
        elapsed_ms: PropTypes.string.isRequired,
        input_actions: PropTypes.arrayOf(PropTypes.object),
        output_actions: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
};

export default StateContainer;
