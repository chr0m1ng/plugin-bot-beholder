import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Contact from 'components/Contact';
import State from 'components/State';

const TraceComponent = ({ data }) => {
    return (
        <div className="trace">
            <header>
                <div className="trace-header">
                    <h1 className={data.error ? 'error' : ''}>
                        <FontAwesomeIcon icon={faCommentDots} /> {data.input}
                    </h1>
                </div>
                <p>
                    <FontAwesomeIcon icon={faStopwatch} /> {data.elapsed_ms}ms
                </p>
                <Contact identity={data.user_identity} />
            </header>
            <div className="states">
                {data.states.map((state) => (
                    <State
                        data={state}
                        key={`${state.id}_${state.timestamp}`}
                    />
                ))}
            </div>
            <ReactJson src={data} collapsed={true} displayDataTypes={false} />
        </div>
    );
};

TraceComponent.propTypes = {
    data: PropTypes.shape({
        input: PropTypes.string.isRequired,
        states: PropTypes.arrayOf(PropTypes.object).isRequired,
        user_identity: PropTypes.string.isRequired,
        error: PropTypes.object,
        timestamp: PropTypes.string.isRequired,
        elapsed_ms: PropTypes.number.isRequired
    }).isRequired
};

export default TraceComponent;
