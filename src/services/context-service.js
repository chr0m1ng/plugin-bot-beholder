import IMPConstants from 'constants/iframe-message-proxy-container';
import { IframeMessageProxy } from 'iframe-message-proxy';
import Node from 'models/node';

const BASE_URI = '/contexts';

const getContextAsync = async (identity) => {
    try {
        const node = new Node(identity);
        const {
            response: { items }
        } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${node}`
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
        const node = new Node(identity);
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${node}/${variable}`
                }
            }
        });
        return response;
    } catch {
        return null;
    }
};

export { getVariableAsync, getContextAsync };
