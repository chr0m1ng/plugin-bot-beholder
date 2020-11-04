import bunyan from 'bunyan';
import { createStream } from 'bunyan-seq';
import * as package_info from '../../../package.json';
import config from '../../config';

let instance = null;

class LoggerProvider {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    _setupLogger() {
        const logger = bunyan.createLogger({
            name: package_info.default.name,
            streams: [
                {
                    stream: process.stdout,
                    level: bunyan.INFO
                },
                createStream({
                    serverUrl: config.api.seq.server_url,
                    apiKey: config.api.seq.api_key,
                    level: bunyan.INFO
                })
            ],
            Application: package_info.default.name
        });

        this.logger = logger;
    }

    getLogger() {
        if (!this.logger) {
            this._setupLogger();
        }
        return this.logger;
    }
}

export default new LoggerProvider();
