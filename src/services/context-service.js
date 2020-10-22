import IMPConstants from 'constants/iframe-message-proxy-container';
import { IframeMessageProxy } from 'iframe-message-proxy';

const BASE_URI = '/contexts';

const getContextAsync = async (identity) => {
    try {
        const {
            response: { items }
        } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${identity}`
                }
            }
        });
        return items;
    } catch {
        return [];
    }
};

const getVariableAsync = async (identity, variable) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${identity}/${variable}`
                }
            }
        });
        return response;
    } catch {
        return null;
    }
};

export { getVariableAsync, getContextAsync };
