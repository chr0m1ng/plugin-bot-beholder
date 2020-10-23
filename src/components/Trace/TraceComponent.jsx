import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import Contact from 'components/Contact';
import State from 'components/State';

const TraceComponent = ({ data }) => {
    return (
        <div className="trace">
            <header>
                <div className="trace-header">
                    <h1 className={data.is_error ? 'error' : ''}>
                        <i className="far fa-comment-dots" /> {data.input}
                    </h1>
                    <span className="date">
                        {new Date(data.timestamp).toLocaleString()}
                    </span>
                </div>
                <p>
                    <i className="fas fa-stopwatch" /> {data.elapsed_ms}ms
                </p>
                <Contact identity={data.identity} />
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
        identity: PropTypes.string.isRequired,
        is_error: PropTypes.bool.isRequired,
        timestamp: PropTypes.string.isRequired,
        elapsed_ms: PropTypes.string.isRequired
    }).isRequired
};

export default TraceComponent;
