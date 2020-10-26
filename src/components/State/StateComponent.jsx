import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import StateDetailsModal from 'components/StateDetailsModal';

const StateComponent = ({
    mouse_x,
    mouse_y,
    data,
    showDetailsModal,
    onHover,
    show_state_details,
    detroyDetailsModal
}) => {
    return (
        <>
            <div className={`state block ${data.error ? 'error' : ''}`}>
                <span className="date">
                    {new Date(data.timestamp).toLocaleString()}
                </span>
                <div className="state-name">
                    <h1>{data.extension_data.name}</h1>
                    <button className="no-style" onClick={showDetailsModal}>
                        <FontAwesomeIcon icon={faSearchPlus} color="#738192" />
                    </button>
                </div>
                <p className="elapsed-time" onMouseOver={onHover}>
                    <FontAwesomeIcon icon={faStopwatch} /> {data.elapsed_ms}ms
                </p>
                <div
                    className="actions"
                    style={{ left: mouse_x, top: mouse_y }}
                >
                    {data.input_actions && data.input_actions.length > 0 && (
                        <ul>
                            <p>Entrada (bloco seguinte)</p>
                            {data.input_actions.map((action, idx) => (
                                <li
                                    key={idx}
                                    className={action.error ? 'error' : ''}
                                >
                                    {`${action.type} - ${action.elapsedMilliseconds}ms`}
                                </li>
                            ))}
                        </ul>
                    )}
                    {data.output_actions && data.output_actions.length > 0 && (
                        <ul>
                            <p>Saída</p>
                            {data.output_actions.map((action, idx) => (
                                <li
                                    key={idx}
                                    className={action.error ? 'error' : ''}
                                >
                                    {`${action.type} - ${action.elapsedMilliseconds}ms`}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {show_state_details && (
                <StateDetailsModal
                    data={data}
                    show={show_state_details}
                    closeModal={detroyDetailsModal}
                />
            )}
        </>
    );
};

StateComponent.propTypes = {
    mouse_x: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    mouse_y: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    data: PropTypes.shape({
        error: PropTypes.object,
        timestamp: PropTypes.string.isRequired,
        extension_data: PropTypes.object.isRequired,
        elapsed_ms: PropTypes.number.isRequired,
        input_actions: PropTypes.arrayOf(PropTypes.object),
        output_actions: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    onHover: PropTypes.func.isRequired,
    show_state_details: PropTypes.bool.isRequired,
    showDetailsModal: PropTypes.func.isRequired,
    detroyDetailsModal: PropTypes.func.isRequired
};

export default StateComponent;
