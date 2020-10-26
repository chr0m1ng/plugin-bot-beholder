import BlipState from './blip-state';

class BlipTrace {
    constructor({
        elapsedMilliseconds,
        error,
        flowId,
        id,
        input,
        states,
        timestamp,
        user
    }) {
        this.elapsed_ms = elapsedMilliseconds;
        this.error = error;
        this.flow_id = flowId;
        this.id = id;
        this.input = input;
        this.states = states.map((s) => new BlipState(s));
        this.timestamp = timestamp;
        this.user_identity = user;
    }
}

export default BlipTrace;
