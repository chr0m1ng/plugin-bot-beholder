import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from 'constants/iframe-message-proxy-container';
import Node from 'models/node';

const BASE_URI = '/contacts';

const getContactAsync = async (identity) => {
    try {
        const node = new Node(identity);
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.send_command,
            content: {
                destination: IMPConstants.Destinations.messaging_hub_service,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${node}`
                }
            }
        });
        return response;
    } catch {
        return {};
    }
};

export { getContactAsync };
