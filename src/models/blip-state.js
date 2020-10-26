class BlipState {
    constructor({
        elapsedMilliseconds,
        error,
        extensionData,
        id,
        inputActions,
        outputActions,
        outputs,
        timestamp
    }) {
        this.elapsed_ms = elapsedMilliseconds;
        this.error = error;
        this.extension_data = extensionData;
        this.id = id;
        this.input_actions = inputActions;
        this.output_actions = outputActions;
        this.outputs = outputs;
        this.timestamp = timestamp;
    }
}

export default BlipState;
