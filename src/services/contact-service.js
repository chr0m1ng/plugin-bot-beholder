import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from 'constants/iframe-message-proxy-container';

const BASE_URI = '/contacts';

const getContactAsync = async (identity) => {
    try {
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
    } catch {
        return {};
    }
};

export { getContactAsync };
