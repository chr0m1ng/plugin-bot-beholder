import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from 'constants/iframe-message-proxy-container';

const BASE_URI = '/contacts';

const getContactAsync = async (identity) => {
    const { response } = await IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.send_command,
        content: {
            destination: IMPConstants.Destinations.messaging_hub_service,
            command: {
                method: IMPConstants.CommandMethods.GET,
                uri: `${BASE_URI}/${identity}`
            }
        }
    });
    return response;
};

const getAllContactsAsync = async () => {
    const {
        response: { items }
    } = await IframeMessageProxy.sendMessage({
        action: IMPConstants.Actions.send_command,
        content: {
            destination: IMPConstants.Destinations.messaging_hub_service,
            command: {
                method: IMPConstants.CommandMethods.GET,
                uri: BASE_URI
            }
        }
    });
    return items;
};

export { getContactAsync, getAllContactsAsync };
