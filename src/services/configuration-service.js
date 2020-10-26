import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from 'constants/iframe-message-proxy-container';
import config from 'config';

const BASE_URL = '/buckets/blip_portal';
const BASE_TRACE_TARGET = `${config.pret_url}/trace`;
const TRACE_MODE = 'All';
const TRACE_TARGET_TYPE = 'Http';

const getBotVariablesAsync = async (version) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URL}:builder_${version}_configuration`
                }
            }
        });
        return response;
    } catch {
        return {};
    }
};

const setBotVariablesAsync = async (version, variables) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.SET,
                    type: 'application/json',
                    uri: `${BASE_URL}:builder_${version}_configuration`,
                    resource: variables
                }
            }
        });
        return response;
    } catch {
        return null;
    }
};

const configureTracingAsync = async (identifier) => {
    await Promise.all(
        ['working', 'published'].map(async (v) => {
            const bot_variables = await getBotVariablesAsync(v);
            bot_variables.TraceTargetType = TRACE_TARGET_TYPE;
            bot_variables.TraceMode = TRACE_MODE;
            bot_variables.TraceTarget = `${BASE_TRACE_TARGET}/${identifier}`;
            return setBotVariablesAsync(v, bot_variables);
        })
    );
};

export { configureTracingAsync };
